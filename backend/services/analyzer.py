
import os
import torch
import torch.nn.functional as F
from .ai_models import DeepFakeDetector
from .preprocessing import process_video

# Global model instance for caching
_model_instance = None

def get_model():
    """
    Singleton pattern to load the model once.
    """
    global _model_instance
    if _model_instance is None:
        # Path to weights - assuming a standard location relative to this file
        # Service is in backend/services/, so weights in backend/weights/
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        weights_path = os.path.join(base_dir, "weights", "model.pth")
        
        _model_instance = DeepFakeDetector(weights_path=weights_path)
        
        # Move to GPU if available
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        _model_instance.to(device)
        _model_instance.eval() # Set to evaluation mode
        
    return _model_instance

def analyze_video(video_path: str):
    """
    Analyze a video using the DeepFakeDetector (EfficientNet + BiLSTM).
    """
    try:
        model = get_model()
        device = next(model.parameters()).device
        
        # 1. Preprocess
        # Returns tensor (1, Seq, C, H, W)
        video_tensor = process_video(video_path)
        video_tensor = video_tensor.to(device)
        
        # 2. Inference
        with torch.no_grad():
            probability_tensor = model(video_tensor)
            probability = probability_tensor.item()
            
        # 3. Format Result
        label = "fake" if probability > 0.5 else "real"
        
        # Calculate confidence
        # If prob is 0.9, confidence is high. If 0.51, low.
        dist_from_center = abs(probability - 0.5)
        if dist_from_center > 0.35: # < 0.15 or > 0.85
            confidence = "high"
        elif dist_from_center > 0.15: # < 0.35 or > 0.65
            confidence = "medium"
        else:
            confidence = "low"

        result = {
            "label": label,
            "probability": round(probability, 4),
            "confidence": confidence
        }
        
        print(f"Analysis complete for {video_path}: {result}")
        return {"status": "completed", "result": result}

    except Exception as e:
        print(f"Error analyzing video {video_path}: {e}")
        # Return error structure but don't crash not to crash the server
        return {"status": "failed", "error": str(e)}
