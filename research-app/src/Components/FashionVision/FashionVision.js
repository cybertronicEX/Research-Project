import React, { useRef, useState } from 'react';
import axios from 'axios';

const clothingTypes = ['Casual', 'Sport', 'Formal', 'Ethnic', 'Smart Casual', 'Travel', 'Party', 'Home'];

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('');

  const handleStartCapture = () => {
    console.log("Starting camera capture...");
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        console.log("Camera capture started successfully.");
        videoRef.current.addEventListener('loadedmetadata', handleCaptureFrame);
      })
      .catch(error => {
        console.error('Error accessing camera: ', error);
      });
  };

  const handleStopCapture = () => {
    console.log('Stopping camera capture...');
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    console.log('Camera capture stopped.');
  };

  const handleCaptureFrame = () => {
    console.log("Capturing frame...");
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    console.log("Frame captured.");

    canvas.toBlob(blob => {
      console.log("Blob:", blob);

      const formData = new FormData();
      formData.append('image', blob, 'frame.png');
  
      axios.post('http://127.0.0.1:5001/vpredict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log("Predictions received:", response.data.vpredictions);
        const predictedIndex = response.data.vpredictions[0].indexOf(Math.max(...response.data.vpredictions[0]));
        const predictedClothingType = clothingTypes[predictedIndex];
        setPrediction(predictedClothingType);
        requestAnimationFrame(handleCaptureFrame);
      })
      .catch(error => {
        console.error('Error uploading frame: ', error);
      });
    }, 'image/png');
  };

  return (
    <div>
      <h1>Fashion Image Classifier - Live Camera</h1>
      <div>
        <button onClick={handleStartCapture}>Start Camera</button>
        <button onClick={handleStopCapture}>Stop Camera</button>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video ref={videoRef} autoPlay />
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.7)', padding: '10px' }}>
          <h2>Predicted Clothing Type:</h2>
          <p>{prediction}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
