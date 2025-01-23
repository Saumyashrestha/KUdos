import { useEffect, useState } from "react";

const slides = [
    {
        src: "/carousel1.jpg",
        alt: "Carousel 1"
    },
    {
        src: "/carousel2.jpg",
        alt: "Carousel 2"
    },
    {
        src: "/carousel3.jpg",
        alt: "Carousel 3"
    }
];

const Carousel = () => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    let timeOut = null;

    const nextSlide = () => {
        setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        timeOut = autoplay && setTimeout(() => {
            nextSlide();
        }, 2000);
        return () => clearTimeout(timeOut);
    });

    return (
        <div
            className="overflow-hidden relative w-full"
            onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoplay(true);
            }}
        >
            <div
                className="flex transition-transform ease-out duration-300"
                style={{
                    transform: `translateX(-${slide * 100}vw)`,
                    width: `${slides.length * 100}vw`
                }}
            >
                {slides.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-[100vw] h-[75vh]"
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Dots for Slide Navigation */}
            <div className="absolute bottom-4 py-3 flex justify-center gap-3 w-full">
                {slides.map((_, idx) => (
                    <div
                        onClick={() => {
                            setSlide(idx);
                        }}
                        key={"circle" + idx}
                        className={`rounded-full w-3 h-3 cursor-pointer ${
                            idx === slide ? "bg-white" : "bg-gray-300"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
