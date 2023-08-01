import { images } from "@/assets";
import Image from "next/image";
import React from "react";

const ScollTop = () => {
    return (
        <div
            style={{ position: 'fixed', top: '60%', right: '5%', background: '#FFFF', borderRadius: 15 }}
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Image src={images.icon_scroll} alt="photo" className="item-image" style={{ width: 30 }} />
        </div>
    )
}

export default ScollTop