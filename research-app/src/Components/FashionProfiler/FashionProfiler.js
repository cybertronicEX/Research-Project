import React, { useState } from 'react'
import './FashionProfiler.css'
import PredictionDialog from './PredictionDialog';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FashionProfiler = () => {

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
          <input className='FPImageInput' id='image1' type='file' />
          <input className='FPImageInput' id='image2' type='file' />
          <input className='FPImageInput' id='image3' type='file' />
          <input className='FPImageInput' id='image4' type='file' />
          <button className='FPFormSubmitButton' type='submit'>Submit</button>
        </form>
      </div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <PredictionDialog onClose={handleCloseDialog} />
      </Dialog>

    </div>
  )
}

export default FashionProfiler