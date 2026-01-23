
import sys
import os
import cv2
import numpy as np

# Add backend to path to import services
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from services.analyzer import analyze_video

def create_dummy_video(filename="dummy_test.mp4", duration_sec=2, fps=30):
    """Creates a black video file for testing."""
    height, width = 480, 640
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(filename, fourcc, fps, (width, height))
    
    frames = duration_sec * fps
    for _ in range(frames):
        # Create a random noise frame
        frame = np.random.randint(0, 255, (height, width, 3), dtype=np.uint8)
        video.write(frame)
        
    video.release()
    print(f"Created temporary video: {filename}")
    return filename

def test_pipeline():
    print("Starting AI Pipeline Verification...")
    
    video_path = create_dummy_video()
    video_abs_path = os.path.abspath(video_path)
    
    try:
        print(f"Testing analyzer with {video_abs_path}...")
        result = analyze_video(video_abs_path)
        
        print("\n--- Result ---")
        print(result)
        
        assert result["status"] == "completed"
        assert "result" in result
        data = result["result"]
        assert "label" in data
        assert "probability" in data
        assert "confidence" in data
        
        print("\n✅ Verification Successful: Pipeline ran from start to finish.")
        
    except Exception as e:
        print(f"\n❌ Verification Failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)
            print("Cleaned up test video.")

if __name__ == "__main__":
    test_pipeline()
