import React, {useState} from "react";
import {slides} from "./carouselData";

export const Carousel = () => {
    const carouselstyle={
        display: "flex",
        justifycontent: "center",
        alignitems: "center",
        width: "600px",
        height: "400px"
    }
    const slidestyle={
        borderradius: "0.5rem",
        boxshadow: "0px 0px 7px #666",
        width: "100%",
        height: "100%"
    }
    var data=slides;
    const [slide, setSlide] = useState(0);
    const nextslide=()=>{setSlide(slide === data.length ? 0:slide+1)};
    const prevslide=()=>{setSlide(slide === 0 ? data.length-1:slide-1)};
    
    return(
        <div style={carouselstyle}>
            {data.map((item, idx)=>{
                return <img src={item.src} alt={item.alt} key={idx} style={slidestyle}/>
            })}
            <span>
            {data.map((_, idx)=>{
                return <button key={idx} onClick={()=>setSlide(idx)}></button>
            })} 
            </span>
        </div>
    );
}