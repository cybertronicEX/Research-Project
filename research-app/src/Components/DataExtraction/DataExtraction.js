import React from 'react'
import './DataExtraction.css'
import { FaSearch } from "react-icons/fa";
const DataExtraction = () => {
  const handleSubmit = () => {
    alert('URL inserted')
  }
  return (
    <div className='DEMain'>
      <div className='DEHeading'>
        <h1>Data Extraction</h1>
      </div>
      <div className='DEInputHolder'>
        <input className='DEInputField' placeholder='Insert URL' />
        <button className='DESearchButton' type='submit' onClick={handleSubmit}>
          <FaSearch />
        </button>

      </div>
    </div>
  )
}

export default DataExtraction