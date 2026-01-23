import requests
import os

def test_analyze_endpoint():
    url = "http://localhost:8000/analyze/"
    
    # Create a dummy video file (minimal valid mp4 header or just bytes)
    # Since the detector uses OpenCV, it might need a real video structure, 
    # but for "file upload" testing, any file with video extension is a start.
    # However, to avoid copier crashing in cv2, we might need a real file or accept failure.
    # Let's try sending a file and expect a response (even if it's an analysis error due to empty content).
    
    with open("test_video.mp4", "wb") as f:
        f.write(b'\x00' * 1024) # dummy content

    files = {'file': ('test_video.mp4', open('test_video.mp4', 'rb'), 'video/mp4')}
    
    try:
        response = requests.post(url, files=files)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
             print("SUCCESS: Endpoint is working")
        else:
             print("FAILURE: Endpoint returned error")
             
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if os.path.exists("test_video.mp4"):
            os.remove("test_video.mp4")

if __name__ == "__main__":
    test_analyze_endpoint()
