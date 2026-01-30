import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from tqdm import tqdm
import time
import copy
from sklearn.metrics import accuracy_score
import logging

try:
    from backend.services.ai_models import DeepFakeDetector
    from backend.services.dataset import DeepFakeDataset, get_transforms
except ImportError:
    # Fallback for running script directly from backend/services
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    from backend.services.ai_models import DeepFakeDetector
    from backend.services.dataset import DeepFakeDataset, get_transforms

# Configuration
CONFIG = {
    'data_dir': 'dataset_ready', # Updated to point to the prepared dataset
    'batch_size': 4, # RTX 3050 optimized (Low VRAM due to sequences)
    'num_epochs': 10,
    'learning_rate': 1e-4,
    'num_workers': 4,
    'seq_len': 20,
    'weights_save_path': 'best_model.pth',
    'device': 'cuda' if torch.cuda.is_available() else 'cpu'
}

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def train_model():
    logger.info(f"Using device: {CONFIG['device']}")
    
    # 1. Dataset & Dataloaders
    train_dataset = DeepFakeDataset(
        root_dir=CONFIG['data_dir'], 
        seq_len=CONFIG['seq_len'],
        transform=get_transforms(mode='train'),
        mode='train'
    )
    
    # Simple validation using a subset or separate folder if available
    # For now, we assume user might split folders or we use a subset
    # This example assumes the same folder for simplicity but standard practice uses a split
    # In a real scenario, use torch.utils.data.random_split
    train_size = int(0.8 * len(train_dataset))
    val_size = len(train_dataset) - train_size
    train_subset, val_subset = torch.utils.data.random_split(train_dataset, [train_size, val_size])
    
    train_loader = DataLoader(
        train_subset, batch_size=CONFIG['batch_size'], 
        shuffle=True, num_workers=CONFIG['num_workers'], pin_memory=True
    )
    
    val_loader = DataLoader(
        val_subset, batch_size=CONFIG['batch_size'], 
        shuffle=False, num_workers=CONFIG['num_workers'], pin_memory=True
    )
    
    logger.info(f"Training on {len(train_subset)} videos, Validating on {len(val_subset)} videos")

    # 2. Model Setup
    model = DeepFakeDetector().to(CONFIG['device'])
    
    criterion = nn.BCELoss() # Binary Cross Entropy
    optimizer = optim.Adam(model.parameters(), lr=CONFIG['learning_rate'])
    
    # Mixed Precision Scaler for RTX 3050
    # Use torch.amp.GradScaler for newer PyTorch or torch.cuda.amp.GradScaler for older
    scaler = torch.cuda.amp.GradScaler() 

    best_vloss = float('inf')
    best_model_wts = copy.deepcopy(model.state_dict())

    # 3. Training Loop
    for epoch in range(CONFIG['num_epochs']):
        logger.info(f"Epoch {epoch+1}/{CONFIG['num_epochs']}")
        logger.info('-' * 10)

        # Each epoch has a training and validation phase
        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
                dataloader = train_loader
            else:
                model.eval()
                dataloader = val_loader

            running_loss = 0.0
            running_corrects = 0
            
            # Progress bar
            pbar = tqdm(dataloader, desc=f"{phase} Phase")

            for inputs, labels in pbar:
                inputs = inputs.to(CONFIG['device'])
                labels = labels.to(CONFIG['device']).unsqueeze(1) # (Batch, 1)

                optimizer.zero_grad()

                # Forward
                # Track history if only in train
                with torch.set_grad_enabled(phase == 'train'):
                    with torch.cuda.amp.autocast(): # Mixed Precision
                        outputs = model(inputs)
                        loss = criterion(outputs, labels)

                    preds = (outputs > 0.5).float()

                    # Backward + Optimize only if in training phase
                    if phase == 'train':
                        scaler.scale(loss).backward()
                        scaler.step(optimizer)
                        scaler.update()

                # Statistics
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)
                
                # Update progress bar
                pbar.set_postfix({'loss': loss.item()})

            epoch_loss = running_loss / len(dataloader.dataset)
            epoch_acc = running_corrects.double() / len(dataloader.dataset)

            logger.info(f"{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}")

            # Deep copy the model
            if phase == 'val' and epoch_loss < best_vloss:
                best_vloss = epoch_loss
                best_model_wts = copy.deepcopy(model.state_dict())
                torch.save(model.state_dict(), CONFIG['weights_save_path'])
                logger.info(f"New best model saved to {CONFIG['weights_save_path']}")

    logger.info("Training complete.")
    logger.info(f"Best Validation Loss: {best_vloss:.4f}")

if __name__ == "__main__":
    if not os.path.exists(CONFIG['data_dir']):
        logger.error(f"Dataset path {CONFIG['data_dir']} does not exist. Please update CONFIG in train.py")
    else:
        train_model()
