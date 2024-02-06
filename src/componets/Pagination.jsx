import React from 'react';
import './styles/pagination.css';

const Pagination = ({currentPag, setCurrentPag, totalPag}) => {

    const handlePrev = () => {
        if (currentPag > 1) {
            setCurrentPag(currentPag -1);
        }    
    }

    const handleNext = () => {
        if (currentPag < totalPag) {
            setCurrentPag(currentPag +1); 
        }
    }

  return (
    <div className='pagination'>
        <button onClick={handlePrev}>Prev</button>
        <span>{`${currentPag} / ${totalPag}`}</span>
        <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Pagination;