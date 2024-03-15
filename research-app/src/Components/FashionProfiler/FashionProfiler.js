import React, { useState } from 'react'
import './FashionProfiler.css'
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

  const [selectedImage, setSelectedImage] = useState('');
  const [predictions, setPredictions] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: ''
  });
  const formatProbability = probability => {
    if (typeof probability !== 'number') {
        return 'N/A';
    }
    
    const roundedProbability = probability.toFixed(6);
    const probabilityPercentage = (probability * 100).toFixed(2) + '%';
    return `${roundedProbability} (${probabilityPercentage})`;
};

  const handleImageChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
    clearPredictions();
  };
  const clearPredictions = () => {
    setPredictions({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: ''
    });
};

const predictImage = () => {
    const message = {
        image: selectedImage.replace('data:image/png;base64,', '')
    };

    axios.post('http://127.0.0.1:5001/predict', JSON.stringify(message))
        .then(response => {
            setPredictions(response.data.prediction);
        })
        .catch(error => {
            console.error('Error predicting image:', error);
        });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const Navigator = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    Navigator('/profile')
  };

  return (
    <div className='FPMain'>
      <div className='FPHeading'>
        <h1 className='FPH1'>Fashion Profiler</h1>
      </div>
      <div className='FPBody'>
        <h2 className='FpH2'>Set up your Fashion Profile</h2>
        <form className='FPImageUploaderForm' onSubmit={handleSubmit}>

          <input id="image-selector" className='FPImageInput' type='file' onChange={handleImageChange} />
          <button id="predict-button" className='FPFormSubmitButton' onClick={predictImage} type='submit'>Submit</button>
          <img id="selected-image" src={selectedImage} alt="" />
            
        </form>
            <p>Aristocratic: <span>{formatProbability(predictions.first)}</span></p>
            <p>Classic: <span>{formatProbability(predictions.second)}</span></p>
            <p>Creative: <span>{formatProbability(predictions.third)}</span></p>
            <p>Dramatic: <span>{formatProbability(predictions.fourth)}</span></p>
            <p>Neutral: <span>{formatProbability(predictions.fifth)}</span></p>
            <p>Romantic: <span>{formatProbability(predictions.sixth)}</span></p>
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
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.first)}</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Classic</Typography>
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.second)}</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Creative</Typography>
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.third)}</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Dramatic</Typography>
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.fourth)}</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Neutral</Typography>
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.fifth)}</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Romantic</Typography>
                        <Typography className='FP_PDTypoAnswer'>: {formatProbability(predictions.sixth)}</Typography>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Accept</Button>
            </DialogActions>
        </div>
        
      </Dialog>

    </div>
    
  )
}

export default FashionProfiler