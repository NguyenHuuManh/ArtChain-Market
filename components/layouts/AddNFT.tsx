import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const AddNFT = () => {
    return (
        <div
            style={{ position: 'fixed', top: '10%', right: '5%', background: '#FFFF', borderRadius: 15, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <AddIcon />
        </div>
    )
}
export default AddNFT;