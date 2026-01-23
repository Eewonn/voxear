from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
import tempfile
from services.analyzer import analyze_video

app = FastAPI()

# Health check endpoints
@app.get("/")
def read_root():
    return {"status": "ok", "message": "Voxear Backend is running"}

# 
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/analyze/")
async def analyze_endpoint(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video.")

    # Create a temporary file to save the uploaded video
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_video:
        try:
            # Copy uploaded file content to temp file
            shutil.copyfileobj(file.file, temp_video)
            temp_path = temp_video.name
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {str(e)}")
        finally:
            file.file.close()

    try:
        # Run analysis
        result = analyze_video(temp_path)
        
        if result.get("status") == "failed":
             raise HTTPException(status_code=500, detail=result.get("error", "Analysis failed"))
             
        return result
        
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up: remove the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

