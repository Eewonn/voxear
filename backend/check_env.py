
import sys

def check_imports():
    print("Checking Core Libraries...")
    
    try:
        import ffmpeg
        print(f"[OK] ffmpeg-python imported")
    except ImportError as e:
        print(f"[FAIL] ffmpeg-python: {e}")

    try:
        import cv2
        print(f"[OK] opencv-python: {cv2.__version__}")
    except ImportError as e:
        print(f"[FAIL] opencv-python: {e}")
        
    try:
        import torch
        print(f"[OK] torch: {torch.__version__}")
    except ImportError as e:
        print(f"[FAIL] torch: {e}")

    try:
        import mediapipe
        print(f"[OK] mediapipe: {mediapipe.__version__}")
    except ImportError as e:
        print(f"[FAIL] mediapipe: {e}")

    try:
        import numpy
        print(f"[OK] numpy: {numpy.__version__}")
    except ImportError as e:
        print(f"[FAIL] numpy: {e}")

    try:
        import scipy
        print(f"[OK] scipy: {scipy.__version__}")
    except ImportError as e:
        print(f"[FAIL] scipy: {e}")

if __name__ == "__main__":
    check_imports()
