import cv2
import os
import glob
from tqdm import tqdm
import argparse

def extract_faces_from_video(video_path, output_folder, face_cascade, max_frames=20):
    """
    Reads a video, detects faces in frames, and saves the crops.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Simple sampling strategy: take 'max_frames' evenly spaced
    indices = set([int(i * total_frames / max_frames) for i in range(max_frames)])
    
    frame_count = 0
    saved_count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_count in indices or max_frames is None:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)
            
            # If multiple faces, take the largest one
            if len(faces) > 0:
                # Retrieve the largest face
                max_area = 0
                max_face = None
                for (x, y, w, h) in faces:
                    if w * h > max_area:
                        max_area = w * h
                        max_face = (x, y, w, h)
                
                x, y, w, h = max_face
                
                # Add a little margin
                margin = int(w * 0.2)
                x1 = max(0, x - margin)
                y1 = max(0, y - margin)
                x2 = min(frame.shape[1], x + w + margin)
                y2 = min(frame.shape[0], y + h + margin)
                
                crop = frame[y1:y2, x1:x2]
                
                # Save
                save_path = os.path.join(output_folder, f"frame_{frame_count}.jpg")
                cv2.imwrite(save_path, crop)
                saved_count += 1
        
        frame_count += 1
        if saved_count >= max_frames:
            break
            
    cap.release()

def main(download_dir, output_root):
    # Setup Face Detector (Haar Cascade is fast and built-in to OpenCV distributions usually)
    # Ensure you have the XML file or use cv2.data.haarcascades
    cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)
    
    if face_cascade.empty():
        print("Error: Could not load Haar Cascade XML. Make sure opencv-python is installed correctly.")
        return

    # Define Mappings
    # Source Folder Name -> Target Class ('real' or 'fake')
    mapping = {
        'original_sequences': 'real',
        'manipulated_sequences': 'fake'
    }

    print(f"Scanning {download_dir}...")
    
    for root_cat, target_class in mapping.items():
        search_path = os.path.join(download_dir, root_cat)
        if not os.path.exists(search_path):
            print(f"Warning: {search_path} not found. Skipping.")
            continue
            
        # Walk through dataset: e.g. original_sequences/youtube/c40/videos/001.mp4
        # We want to find all .mp4 files
        video_files = glob.glob(os.path.join(search_path, '**', '*.mp4'), recursive=True)
        
        print(f"Found {len(video_files)} videos for {root_cat} -> {target_class}")
        
        for video_path in tqdm(video_files):
            # Create a unique output ID based on filename (minus extension)
            video_name = os.path.splitext(os.path.basename(video_path))[0]
            
            # Target output folder
            save_dir = os.path.join(output_root, target_class, video_name)
            os.makedirs(save_dir, exist_ok=True)
            
            # Check if already processed
            if len(os.listdir(save_dir)) > 0:
                continue
                
            extract_faces_from_video(video_path, save_dir, face_cascade)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=str, required=True, help='Root directory where you downloaded FF++ (folder containing original_sequences, etc)')
    parser.add_argument('--output', type=str, required=True, help='Root directory for the ready-to-train dataset')
    args = parser.parse_args()
    
    main(args.input, args.output)
