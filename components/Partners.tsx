import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Image from "next/image"; 
import Link from "next/link"; 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; 
import { useState } from "react";

// Custom Arrow component types
interface ArrowProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function LogoSlider() {   
  const [activeArrow, setActiveArrow] = useState<'none' | 'prev' | 'next'>('none');
  
  // Custom arrow components with active state
  const NextArrow = ({ onClick, ...props }: ArrowProps) => {     
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setActiveArrow('next');
      onClick?.(event);  // Pass the event to the onClick handler
      
      // Reset after a short delay
      setTimeout(() => {
        setActiveArrow('none');
      }, 500);
    };
    
    return (       
      <div         
        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 ${activeArrow === 'next' ? 'bg-blue-600' : 'bg-white'} hover:bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg z-10`}        
        onClick={handleClick}       
        {...props} // Spread any additional props here       
      >         
        <FiChevronRight className={`${activeArrow === 'next' ? 'text-white' : 'text-gray-700'} text-lg`} />       
      </div>     
    );   
  };    
  
  const PrevArrow = ({ onClick, ...props }: ArrowProps) => {     
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setActiveArrow('prev');
      onClick?.(event);  // Pass the event to the onClick handler
      
      // Reset after a short delay
      setTimeout(() => {
        setActiveArrow('none');
      }, 500);
    };
    
    return (       
      <div         
        className={`absolute top-1/2 -left-4 transform -translate-y-1/2 ${activeArrow === 'prev' ? 'bg-blue-600' : 'bg-white'} hover:bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg z-10`}        
        onClick={handleClick}       
        {...props} // Spread any additional props here       
      >         
        <FiChevronLeft className={`${activeArrow === 'prev' ? 'text-white' : 'text-gray-700'} text-lg`} />       
      </div>     
    );   
  };    
  
  const settings = {     
    dots: false,     
    infinite: true,     
    speed: 1200, // Slower transition speed    
    slidesToShow: 2,
    slidesToScroll: 1,     
    autoplay: true,
    autoplaySpeed: 3000, // Slower autoplay speed   
    centerMode: false,
    nextArrow: <NextArrow />,      
    prevArrow: <PrevArrow />,     
    responsive: [       
      {         
        breakpoint: 768,         
        settings: {           
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },       
      },     
    ],   
  };    
  
  const logos = [     
    {
      src: "/images/Logo-BW-circular.png",
      alt: "Bittwok",
      link: "http://bittwok.vercel.app"
    },     
    {
      src: "/images/Ellipse 5.png",
      alt: "Youth for peace Drc",
      link: "https://yfprdc.org/"
    }   
  ];    
  
  return (     
    <div className="w-full bg-gray-100 py-6 pb-4 px-4 rounded-lg relative shadow-md">       
      <h2 className="text-center text-xl md:text-2xl font-bold mb-4 text-gray-800">         
        Our Valued Partners       
      </h2>              
      
      <div className="max-w-3xl mx-auto px-6 relative">         
        <Slider {...settings}>           
          {logos.map((logo, index) => (             
            <div key={index} className="px-3">               
              <Link                  
                href={logo.link}                  
                target="_blank"                 
                rel="noopener noreferrer"                 
                className="block w-32 h-32 md:w-40 md:h-40 relative mx-auto hover:scale-105 transition-transform duration-300 p-3"               
              >                 
                <Image                   
                  src={logo.src}                   
                  alt={logo.alt}                   
                  fill                   
                  className="object-contain p-1"                   
                  sizes="(max-width: 768px) 128px, 160px"                 
                />               
              </Link>             
            </div>           
          ))}         
        </Slider>       
      </div>     
    </div>   
  ); 
}
