import { images } from "@/assets";
import Image from "next/image";
import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScollTop = () => {
    return (
        <div
            style={{ position: 'fixed', top: '60%', right: '5%', background: '#FFFF', borderRadius: 15, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <KeyboardArrowUpIcon />
        </div>
    )
}

export default ScollTop