import { useEffect, useState } from "react";

const slides = [
        {
            src: "https://picsum.photos/seed/img1/1200/450",
            alt: "Image 1"
        },
        {
            src: "https://picsum.photos/seed/img2/1200/450",
            alt: "Image 2"
        },
        {
            src: "https://picsum.photos/seed/img3/1200/450",
            alt: "Image 3"
        }
    ]

const Carousel = () => {

    let[slide,setSlide]=useState(0);
    let[autoplay,setAutoplay]=useState(true);
    let timeOut = null;

    let prevSlide =() =>{
        if(slide===0) setSlide(slides.length-1);
        else setSlide(slide-1);
    };

    let nextslide =() =>{
        if(slide===slides.length-1) setSlide(0);
        else setSlide(slide+1);
    };

    useEffect(()=>{
        timeOut = autoplay && setTimeout(() => {
            nextslide();
        }, 2500);
    })

    return(
        <div className="overflow-hidden relative w-[80%] m-auto" onMouseEnter={()=>{setAutoplay(false); clearTimeout(timeOut);}} onMouseLeave={()=>{setAutoplay(true);}}>
            <div className="flex transition ease-out duration-40" style={{transform: `translateX(-${slide*100}%)`}}>
                {slides.map((items)=>{
                    return(<img src={items.src} alt={items.alt}/>)
                })}
            </div>
            <div className="absolute top-0 h-full w-full justify-between items-center flex px-3">
               <div onClick={prevSlide} className="rounded-full w-10 h-10 bg-white text-center cursor-pointer">P</div>
               <div onClick={nextslide} className="rounded-full w-10 h-10 bg-white text-center cursor-pointer">N</div>
            </div>
            <div className="absolute bottom-0 py-3 flex justify-center gap-3 w-full">
               {slides.map((items, idx)=>{
                return <div onClick={()=>{setSlide(idx)}} key={"circle"+idx} className={`rounded-full w-3 h-3 cursor-pointer ${idx==slide? "bg-white":"bg-gray-300"}`}>
                </div> 
               })}
            </div>
        </div>
    );
}

export default Carousel;