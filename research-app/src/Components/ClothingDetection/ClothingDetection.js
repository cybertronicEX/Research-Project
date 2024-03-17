import React, { useRef, useState } from 'react';
import axios from 'axios';

const articles = ['Accessory Gift Set', 'Baby Dolls', 'Backpacks', 'Bangle', 'Basketballs', 'Bath Robe', 'Beauty Accessory', 'Belts', 'Blazers', 'Body Lotion', 'Body Wash and Scrub', 'Booties', 'Boxers', 'Bra', 'Bracelet', 'Briefs', 'Camisoles', 'Capris', 'Caps', 'Casual Shoes', 'Churidar', 'Clothing Set', 'Clutches', 'Compact', 'Concealer', 'Cufflinks', 'Cushion Covers', 'Deodorant', 'Dresses', 'Duffel Bag', 'Dupatta', 'Earrings', 'Eye Cream', 'Eyeshadow', 'Face Moisturisers', 'Face Scrub and Exfoliator', 'Face Serum and Gel', 'Face Wash and Cleanser', 'Flats', 'Flip Flops', 'Footballs', 'Formal Shoes', 'Foundation and Primer', 'Fragrance Gift Set', 'Free Gifts', 'Gloves', 'Hair Accessory', 'Hair Colour', 'Handbags', 'Hat', 'Headband', 'Heels', 'Highlighter and Blush', 'Innerwear Vests', 'Ipad', 'Jackets', 'Jeans', 'Jeggings', 'Jewellery Set', 'Jumpsuit', 'Kajal and Eyeliner', 'Key chain', 'Kurta Sets', 'Kurtas', 'Kurtis', 'Laptop Bag', 'Leggings', 'Lehenga Choli', 'Lip Care', 'Lip Gloss', 'Lip Liner', 'Lip Plumper', 'Lipstick', 'Lounge Pants', 'Lounge Shorts', 'Lounge Tshirts', 'Makeup Remover', 'Mascara', 'Mask and Peel', 'Mens Grooming Kit', 'Messenger Bag', 'Mobile Pouch', 'Mufflers', 'Nail Essentials', 'Nail Polish', 'Necklace and Chains', 'Nehru Jackets', 'Night suits', 'Nightdress', 'Patiala', 'Pendant', 'Perfume and Body Mist', 'Rain Jacket', 'Rain Trousers', 'Ring', 'Robe', 'Rompers', 'Rucksacks', 'Salwar', 'Salwar and Dupatta', 'Sandals', 'Sarees', 'Scarves', 'Shapewear', 'Shirts', 'Shoe Accessories', 'Shoe Laces', 'Shorts', 'Shrug', 'Skirts', 'Socks', 'Sports Sandals', 'Sports Shoes', 'Stockings', 'Stoles', 'Suits', 'Sunglasses', 'Sunscreen', 'Suspenders', 'Sweaters', 'Sweatshirts', 'Swimwear', 'Tablet Sleeve', 'Ties', 'Ties and Cufflinks', 'Tights', 'Toner', 'Tops', 'Track Pants', 'Tracksuits', 'Travel Accessory', 'Trolley Bag', 'Trousers', 'Trunk', 'Tshirts', 'Tunics', 'Umbrellas', 'Waist Pouch', 'Waistcoat', 'Wallets', 'Watches', 'Water Bottle', 'Wristbands'];

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
  
      axios.post('http://127.0.0.1:5001/itempredict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log("Predictions received:", response.data.vpredictions);
        const predictedIndex = response.data.vpredictions[0].indexOf(Math.max(...response.data.vpredictions[0]));
        const predictedClothingType = articles[predictedIndex];
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
      <h1>Fashion Item Detector- Live Camera</h1>
      <div>
        <button onClick={handleStartCapture}>Start Camera</button>
        <button onClick={handleStopCapture}>Stop Camera</button>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video ref={videoRef} autoPlay />
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.7)', padding: '10px' }}>
          <h2>Scanned item:</h2>
          <p>{prediction}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

