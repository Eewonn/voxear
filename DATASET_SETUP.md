# Dataset Setup Guide

## 1. Download the Data
Use your existing `download.py` script.

python download.py downloaded_data --dataset all --compression c40 --type videos --server EU2

*Wait for this to complete. It will create a folder `downloaded_data` with `original_sequences` and `manipulated_sequences` inside.*

## 2. Extract Frames & Crop Faces
The training pipeline requires cropped face images, but the download gives you full videos.
I have created a helper script `backend/services/extract_frames.py` to do this for you automatically.

**Run this command:**
```bash
python -m backend.services.extract_frames --input downloaded_data --output dataset_ready
```

**Where:**
- `--input`: The folder where `download.py` put the files (e.g., `downloaded_data`).
- `--output`: The folder where you want the training data to be saved (e.g., `dataset_ready`).

*This script uses OpenCV to detect faces and save 20 frames per video.*

## 3. Train the Model
Update the configuration in `backend/services/train.py`:
```python
CONFIG = {
    'data_dir': 'dataset_ready', # Point this to your new output folder
    ...
}
```

Then run:
```bash
python -m backend.services.train
```
