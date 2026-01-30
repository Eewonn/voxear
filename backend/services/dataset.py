import os
import glob
import torch
from torch.utils.data import Dataset
from PIL import Image
from torchvision import transforms
import logging
import random

logger = logging.getLogger(__name__)

class DeepFakeDataset(Dataset):
    """
    Dataset class for Deepfake Detection.
    Expects a root directory with 'real' and 'fake' subdirectories.
    Each subdirectory should contain folders representing videos, 
    and those folders should contain the extracted frames.
    
    Structure:
    root_dir/
      real/
        video_01/
          frame_0.jpg
          frame_1.jpg
      fake/
        video_01_fake/
          frame_0.jpg
    """
    def __init__(self, root_dir, seq_len=20, transform=None, mode='train'):
        """
        Args:
            root_dir (str): Path to the dataset root.
            seq_len (int): Number of frames to retrieve per video (for LSTM).
            transform (callable, optional): PyTorch transforms.
            mode (str): 'train' or 'val'. used for split or augmentation logic.
        """
        self.root_dir = root_dir
        self.seq_len = seq_len
        self.transform = transform
        self.mode = mode
        
        self.video_paths = []
        self.labels = []
        
        # 1. Load Real Videos (Label: 0)
        real_path = os.path.join(root_dir, 'real')
        if os.path.exists(real_path):
            self._load_class_videos(real_path, label=0)
        else:
            logger.warning(f"Path not found: {real_path}")

        # 2. Load Fake Videos (Label: 1)
        fake_path = os.path.join(root_dir, 'fake')
        if os.path.exists(fake_path):
            self._load_class_videos(fake_path, label=1)
        else:
            logger.warning(f"Path not found: {fake_path}")
            
        if not self.video_paths:
            logger.error(f"No videos found in {root_dir}. Check structure!")

    def _load_class_videos(self, class_path, label):
        # List all subdirectories (each is a video)
        video_folders = [f.path for f in os.scandir(class_path) if f.is_dir()]
        for video_folder in video_folders:
            # Check if video folder has images
            frames = sorted(glob.glob(os.path.join(video_folder, '*.jpg')) + 
                          glob.glob(os.path.join(video_folder, '*.png')))
            
            # Filter out videos with too few frames
            if len(frames) >= self.seq_len:
                self.video_paths.append(video_folder)
                self.labels.append(label)

    def __len__(self):
        return len(self.video_paths)

    def __getitem__(self, idx):
        video_path = self.video_paths[idx]
        label = self.labels[idx]
        
        # Get all frames
        all_frames = sorted(glob.glob(os.path.join(video_path, '*.jpg')) + 
                          glob.glob(os.path.join(video_path, '*.png')))
        
        # Sampling Strategy
        # If we have more frames than needed, sample uniformly
        total_frames = len(all_frames)
        if total_frames > self.seq_len:
            # Uniform sampling indices
            indices = list(range(0, total_frames, total_frames // self.seq_len))[:self.seq_len]
        else:
            # Should be handled by __init__ filter, but fallback just in case
            indices = list(range(total_frames))
            # Padding could be added here if strictly required
        
        selected_frames_paths = [all_frames[i] for i in indices]
        
        frames_tensor = []
        for p in selected_frames_paths:
            try:
                img = Image.open(p).convert('RGB')
                if self.transform:
                    img = self.transform(img)
                frames_tensor.append(img)
            except Exception as e:
                logger.error(f"Error loading image {p}: {e}")
                # Fallback: add a black frame or duplicate previous
                frames_tensor.append(torch.zeros((3, 224, 224)))
        
        # Stack frames to create (Seq_Len, Channels, Height, Width)
        # Result shape: (20, 3, 224, 224)
        video_tensor = torch.stack(frames_tensor)
        
        return video_tensor, torch.tensor(label, dtype=torch.float32)

def get_transforms(mode='train'):
    """
    Returns standard ImageNet stats + Resize.
    """
    # ImageNet normalization
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
    
    if mode == 'train':
        return transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.ColorJitter(brightness=0.1, contrast=0.1),
            transforms.ToTensor(),
            normalize
        ])
    else:
        return transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            normalize
        ])
