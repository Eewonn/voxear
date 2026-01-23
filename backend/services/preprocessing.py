
import cv2
import torch
import numpy as np
from torchvision import transforms

def process_video(video_path: str, max_duration: int = 30, fps_sample: int = 3) -> torch.Tensor:
    """
    Process a video file into a tensor suitable for the AI model.
    
    Processing steps:
    1. Load video.
    2. Trim to first 'max_duration' seconds.
    3. Sample frames at 'fps_sample' rate.
    4. Resize frames to 224x224.
    5. Normalize using ImageNet mean/std.
    
    Args:
        video_path: Path to the video file.
        max_duration: Maximum duration in seconds to process.
        fps_sample: Number of frames per second to sample.
        
    Returns:
        torch.Tensor: Shape (1, Sequence_Length, 3, 224, 224)
    """
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        raise ValueError(f"Could not open video file: {video_path}")

    video_fps = cap.get(cv2.CAP_PROP_FPS)
    if video_fps <= 0:
        video_fps = 30 # Default fallback
        
    frame_interval = int(max(1, video_fps / fps_sample))
    max_frames = max_duration * fps_sample
    
    frames = []
    frame_count = 0
    sampled_count = 0
    
    # Transform: Resize -> ToTensor -> Normalize (ImageNet stats)
    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Check if we should sample this frame
            if frame_count % frame_interval == 0:
                # Convert BGR (OpenCV) to RGB
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                
                # Apply transforms
                frame_tensor = transform(frame_rgb)
                frames.append(frame_tensor)
                
                sampled_count += 1
                if sampled_count >= max_frames:
                    break
            
            frame_count += 1
    finally:
        cap.release()
        
    if not frames:
        raise ValueError("No frames could be extracted from the video.")
        
    # Stack frames into a sequence tensor (Seq, Channels, Height, Width)
    video_sequence = torch.stack(frames)
    
    # Add batch dimension: (1, Seq, C, H, W)
    return video_sequence.unsqueeze(0)
