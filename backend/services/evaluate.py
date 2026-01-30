import os
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import logging

try:
    from backend.services.ai_models import DeepFakeDetector
    from backend.services.dataset import DeepFakeDataset, get_transforms
except ImportError:
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    from backend.services.ai_models import DeepFakeDetector
    from backend.services.dataset import DeepFakeDataset, get_transforms

# Configuration
CONFIG = {
    'data_dir': 'dataset_ready', # Same as train folder
    'batch_size': 4,
    'seq_len': 20,
    'weights_path': 'best_model.pth',
    'device': 'cuda' if torch.cuda.is_available() else 'cpu'
}

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def evaluate_model():
    # 1. Load Data
    # In practice, point to a specific 'test' folder
    dataset = DeepFakeDataset(
        root_dir=CONFIG['data_dir'], 
        seq_len=CONFIG['seq_len'],
        transform=get_transforms(mode='val'),
        mode='val'
    )
    
    loader = DataLoader(dataset, batch_size=CONFIG['batch_size'], shuffle=False, num_workers=4)
    
    # 2. Load Model
    model = DeepFakeDetector(weights_path=CONFIG['weights_path'])
    model.to(CONFIG['device'])
    model.eval()
    
    all_preds = []
    all_labels = []
    
    logger.info("Starting Evaluation...")
    
    with torch.no_grad():
        for inputs, labels in loader:
            inputs = inputs.to(CONFIG['device'])
            labels = labels.to(CONFIG['device'])
            
            outputs = model(inputs)
            preds = (outputs > 0.5).float()
            
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())
            
    # 3. Compute Metrics
    all_preds = np.array(all_preds).flatten()
    all_labels = np.array(all_labels).flatten()
    
    acc = accuracy_score(all_labels, all_preds)
    report = classification_report(all_labels, all_preds, target_names=['Real', 'Fake'])
    conf_matrix = confusion_matrix(all_labels, all_preds)
    
    print(f"\nAccuracy: {acc:.4f}\n")
    print("Classification Report:")
    print(report)
    
    # 4. Plot Confusion Matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['Real', 'Fake'], yticklabels=['Real', 'Fake'])
    plt.ylabel('Actual Label')
    plt.xlabel('Predicted Label')
    plt.title('Confusion Matrix')
    plt.savefig('confusion_matrix.png')
    logger.info("Confusion matrix saved as confusion_matrix.png")

if __name__ == "__main__":
    if not os.path.exists(CONFIG['weights_path']):
         logger.error(f"Weights file {CONFIG['weights_path']} not found. Train the model first.")
    elif not os.path.exists(CONFIG['data_dir']):
         logger.error(f"Dataset path {CONFIG['data_dir']} does not exist.")
    else:
        evaluate_model()
