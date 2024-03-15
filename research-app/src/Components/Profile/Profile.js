import React from 'react'
import './Profile.css'
import { Typography } from '@mui/material';
import dummy from '../../Data/Dummy.png'; // Use the absolute path
const Profile = () => {
    return (
        <div className='ProfileMain'>
            <div className='ProfileComponentContainer'>
                <h1 className='ProfileH1'>Profile</h1>
                <div className='ProfileImageContainer'>
                    <div className='ProfileImageCard'>
                        <img className='ProfileImage' src={dummy} />
                    </div>
                    <div className='ProfileImageCard'>
                        <img className='ProfileImage' src={dummy} />
                    </div>
                    <div className='ProfileImageCard'>
                        <img className='ProfileImage' src={dummy} />
                    </div>
                    <div className='ProfileImageCard'>
                        <img className='ProfileImage' src={dummy} />
                    </div>
                </div>
                <div className='ProfilePredictionCard'>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 1</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 2</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 3</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 4</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 5</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                    <div className="ProfilePrediction">
                        <Typography className='ProfileTypoPrediction'>Prediction 6</Typography>
                        <Typography className='ProfileTypoAnswer'>: Insert Prediction here</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile