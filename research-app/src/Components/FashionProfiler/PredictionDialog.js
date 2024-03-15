import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import './PredictionDialog.css';

const PredictionDialog = ({ onClose }) => {
    return (
        <div className='PFDialogMain'>
            <DialogTitle>{"Here are our predictions on your fashion profile:"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 1</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 2</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 3</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 4</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 5</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="FP_PDpredictionLine">
                        <Typography className='FP_PDTypoPrediction'>Prediction 6</Typography>
                        <Typography className='FP_PDTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Accept</Button>
            </DialogActions>
        </div>
    )
}
export default PredictionDialog