import React, { useState } from 'react'
import './Recommender.css'
import { FaMousePointer } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import RecommendDialog from './RecommendDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const Recommender = () => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        value1: 0.166666,
        value2: 0.166666,
        value3: 0.166666,
        value4: 0.166666,
        value5: 0.166666,
        value6: 0.166666
    });

    const generateText = () => {
        setLoading(true); 
        const { value1, value2, value3, value4, value5, value6 } = values;
        const percentValues = {
            value1: (value1 * 100).toFixed(2),
            value2: (value2 * 100).toFixed(2),
            value3: (value3 * 100).toFixed(2),
            value4: (value4 * 100).toFixed(2),
            value5: (value5 * 100).toFixed(2),
            value6: (value6 * 100).toFixed(2)
        };
        console.log(percentValues,'%');
        const prompt = `What kind of clothing would you recommend someone who is ${percentValues.value1}% Aristocratic, ${percentValues.value2}% Classic, ${percentValues.value3}% Creative, ${percentValues.value4}% Dramatic, ${percentValues.value5}% Neutral, ${percentValues.value6}% Romantic?`;

        fetch('http://172.28.6.36:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })
            .then(response => response.json())
            .then(data => {
                setResponse(data.generated_text);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when text generation completes
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = parseFloat(value);
        const total = parsedValue + Object.values(values).reduce((acc, currentValue) => acc + parseFloat(currentValue), 0) - values[name];
    
        if (total <= 1) {
            setValues({ ...values, [name]: parsedValue });
        } else {
            // If the total exceeds 1, set the current input's value to the maximum allowed value to keep the total within the limit
            const maxValue = Math.max(0, 1 - (total - parsedValue));
            setValues({ ...values, [name]: maxValue.toFixed(6) });
        }
    };
    
    // dialog box
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsDialogOpen(true);
        generateText();
    };


    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setResponse('');
    };

    return (
        <div className='RecommendMain'>
            <h1 className='RecommendH1'>Recommendation Engine</h1>
            <div className='RecommendComponentContainer'>
                <div className='RecommendInputContainer'>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value1">Aristocratic :</label>
                        <input className='RecommendInput' type="number" id="value1" name="value1" step="0.000001" min="0" max="1" value={values.value1} onChange={handleInputChange} />
                    </div>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value2"> Classic :</label>
                        <input className='RecommendInput' type="number" id="value2" name="value2" step="0.000001" min="0" max="1" value={values.value2} onChange={handleInputChange} />
                    </div>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value3"> Creative :</label>
                        <input className='RecommendInput' type="number" id="value3" name="value3" step="0.000001" min="0" max="1" value={values.value3} onChange={handleInputChange} />
                    </div>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value4"> Dramatic :</label>
                        <input className='RecommendInput' type="number" id="value4" name="value4" step="0.000001" min="0" max="1" value={values.value4} onChange={handleInputChange} />
                    </div>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value5"> Neutral :</label>
                        <input className='RecommendInput' type="number" id="value5" name="value5" step="0.000001" min="0" max="1" value={values.value5} onChange={handleInputChange} />
                    </div>
                    <div className='RecommendInputSubContainer'>
                        <label className='RecommendInputLabel' htmlFor="value6"> Romantic :</label>
                        <input className='RecommendInput' type="number" id="value6" name="value6" step="0.000001" min="0" max="1" value={values.value6} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='RecommendButtonContainer'>
                    <button className='RecommendButton1' onClick={handleSubmit}><FaMousePointer />Get Recommendation</button>
                </div>

                <Dialog
                    open={isDialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-describedby="alert-dialog-slide-description"

                >
                    <RecommendDialog onClose={handleCloseDialog} response={response} isLoading={loading}/>
                </Dialog>

            </div>
        </div>
    )
}

export default Recommender;
