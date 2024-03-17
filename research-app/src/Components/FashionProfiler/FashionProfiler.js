import React, { useState } from 'react';
import './FashionProfiler.css';
import PredictionDialog from './PredictionDialog';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './PredictionDialog.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FashionProfiler = () => {
  const [selectedImages, setSelectedImages] = useState(['', '', '', '']);
  const [predictions, setPredictions] = useState({
    first: { total: 0, count: 0 },
    second: { total: 0, count: 0 },
    third: { total: 0, count: 0 },
    fourth: { total: 0, count: 0 },
    fifth: { total: 0, count: 0 },
    sixth: { total: 0, count: 0 }
  });

  const formatProbability = probability => {
    if (typeof probability !== 'number') {
        return 'N/A';
    }
    
    const roundedProbability = probability.toFixed(6);
    const probabilityPercentage = (probability * 100).toFixed(2) + '%';
    return `${roundedProbability} (${probabilityPercentage})`;
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const updatedImages = [...selectedImages];
        updatedImages[index] = reader.result;
        setSelectedImages(updatedImages);
    };

    reader.readAsDataURL(file);
    clearPredictions();
  };

  const clearPredictions = () => {
    setPredictions({
        first: { total: 0, count: 0 },
        second: { total: 0, count: 0 },
        third: { total: 0, count: 0 },
        fourth: { total: 0, count: 0 },
        fifth: { total: 0, count: 0 },
        sixth: { total: 0, count: 0 }
    });
  };

  const predictImages = () => {
    selectedImages.forEach((image, index) => {
      const message = {
        image: image.replace('data:image/png;base64,', '')
      };

      axios.post('http://127.0.0.1:5001/predict', JSON.stringify(message))
          .then(response => {
              const updatedPredictions = { ...predictions };
              Object.keys(updatedPredictions).forEach(category => {
                updatedPredictions[category].total += response.data.prediction[category];
                updatedPredictions[category].count++;
              });
              setPredictions(updatedPredictions);
          })
          .catch(error => {
              console.error('Error predicting image:', error);
          });
    });
  };

  const calculateAverages = () => {
    const averagedPredictions = {};
    Object.keys(predictions).forEach(category => {
      averagedPredictions[category] = predictions[category].total / predictions[category].count;
    });
    return averagedPredictions;
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const Navigator = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleRetry = () => {
    setIsDialogOpen(false);
    clearPredictions();
};

const handleCloseDialog = () => {
    setIsDialogOpen(false);
    Navigator('/profile');
};

  return (
    <div className='FPMain'>
      <div className='FPHeading'>
        <h1 className='FPH1'>Fashion Profiler</h1>
      </div>
      <div className='FPBody'>
        <h2 className='FpH2'>Set up your Fashion Profile</h2>
        <form className='FPImageUploaderForm' onSubmit={handleSubmit}>
          {[0, 1, 2, 3].map(index => (
            <div key={index}>
              <input className='FPImageInput' type='file' onChange={e => handleImageChange(e, index)} />
              {/* <img className='FPSelectedImage' src={selectedImages[index]} alt="" /> */}
            </div>
          ))}
          <button className='FPFormSubmitButton' onClick={predictImages} type='submit'>Submit</button>
        </form>
      </div>

      <Dialog
    open={isDialogOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseDialog}
    aria-describedby="alert-dialog-slide-description"
>
    <div className='PFDialogMain'>
        <DialogTitle>{"Here are our predictions on your fashion profile:"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Aristocratic</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().first)}</Typography>
                </div>
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Classic</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().second)}</Typography>
                </div>
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Creative</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().third)}</Typography>
                </div>
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Dramatic</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().fourth)}</Typography>
                </div>
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Neutral</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().fifth)}</Typography>
                </div>
                <div className="FP_PDpredictionLine">
                    <Typography className='FP_PDTypoPrediction'>Romantic</Typography>
                    <Typography className='FP_PDTypoAnswer'>: {formatProbability(calculateAverages().sixth)}</Typography>
                </div>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetry}>Retry</Button>
          <Button onClick={handleCloseDialog}>Accept</Button>
        </DialogActions>
    </div>
</Dialog>
    </div>
  )
}

export default FashionProfiler;
