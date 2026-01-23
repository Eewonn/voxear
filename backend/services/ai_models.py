
import torch
import torch.nn as nn
from torchvision import models
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DeepFakeDetector(nn.Module):
    def __init__(self, weights_path: str = None):
        super(DeepFakeDetector, self).__init__()
        
        # 1. Spatial Feature Extractor: EfficientNet-B0
        # We use the pretrained model but remove the classifier head
        original_model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
        self.cnn = nn.Sequential(*list(original_model.children())[:-1]) # Remove classifier, keeps AdaptiveAvgPool
        
        # EfficientNet-B0 outputs 1280 features
        cnn_out_features = 1280
        
        # 2. Temporal Analysis: BiLSTM
        hidden_size = 128
        num_layers = 1
        self.lstm = nn.LSTM(
            input_size=cnn_out_features,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            bidirectional=True
        )
        
        # 3. Classifier Head
        # Input: hidden_size * 2 (because bidirectional)
        self.fc = nn.Sequential(
            nn.Linear(hidden_size * 2, 64),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(64, 1),
            nn.Sigmoid() # Output probability [0, 1]
        )
        
        # Load weights if provided
        self._load_weights(weights_path)
        
    def _load_weights(self, weights_path):
        if weights_path and os.path.exists(weights_path):
             try:
                state_dict = torch.load(weights_path, map_location=torch.device('cpu'))
                self.load_state_dict(state_dict)
                logger.info(f"Successfully loaded weights from {weights_path}")
             except Exception as e:
                 logger.error(f"Failed to load weights from {weights_path}: {e}")
                 logger.warning("Using random initialization.")
        else:
             if weights_path:
                 logger.warning(f"Weights file not found at {weights_path}")
             logger.warning("Using random initialization. Predictions will be random!")

    def forward(self, x):
        """
        Args:
            x: Video tensor of shape (Batch, Seq_Len, Channels, Height, Width)
        """
        batch_size, seq_len, c, h, w = x.shape
        
        # Fold batch and sequence dimensions for CNN processing
        # (Batch * Seq, C, H, W)
        c_in = x.view(batch_size * seq_len, c, h, w)
        
        # Extract features with CNN
        # Output: (Batch * Seq, 1280, 1, 1) -> Squeeze -> (Batch * Seq, 1280)
        c_out = self.cnn(c_in)
        c_out = c_out.squeeze(-1).squeeze(-1)
        
        # Unfold to (Batch, Seq, Features) for LSTM
        r_in = c_out.view(batch_size, seq_len, -1)
        
        # Process with LSTM
        # output: (Batch, Seq, Num_Directions * Hidden_Size)
        # hn: (Num_Layers * Num_Directions, Batch, Hidden_Size)
        lstm_out, (hn, cn) = self.lstm(r_in)
        
        # We can use the last hidden state or pool the outputs. 
        # Using the last output of the sequence (for both directions)
        # However, a common strategy for video classification is global average pooling over time
        # or just taking the last time step.
        # Let's take the output of the last time step.
        
        # Take the last time step's output
        final_feature = lstm_out[:, -1, :] 
        
        # Classification
        probability = self.fc(final_feature)
        
        return probability
