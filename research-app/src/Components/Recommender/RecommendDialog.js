import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import './RecommendDialog.css';

const RecommendDialog = ({ onClose, response, isLoading }) => {
    console.log(isLoading, 'isLoading');
    return (
        <div className='RecommendDialogMain'>
            {isLoading ? (
            <div className="RecommendLoader">
                <div className="RecommendSpinner"></div>
                <Typography  className='RecDialogLoading'>Generating Recommendation..</Typography>
            </div>
            ) : (<>
                <DialogTitle>{"Here is our recommendation considering your fashion profile:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="RecDialogpredictionLine">
                            <Typography className='RecDialogTypoPrediction'>{response}</Typography>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </>
            )}

        </div >
    )
}
export default RecommendDialog