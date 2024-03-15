import React from 'react'
import './Recommender.css'
import { Button } from '@mui/material'
import { FaMousePointer } from "react-icons/fa";
const Recommender = () => {
    return (
        <div className='RecommendMain'>
            <h1 className='RecommendH1'>Recommendation Engine</h1>
            <div className='RecommendComponentContainer'>
                <div className='RecommendButtonContaier'>
                    <Button variant='Contained' startIcon={<FaMousePointer />} fullWidth className='RecommendButton1'>Get Recommendation</Button>
                </div>
            </div>
        </div>
    )
}

export default Recommender