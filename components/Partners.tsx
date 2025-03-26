  import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function LogoSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const logos = [
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
    { src: "/images/whatwedo.png", alt: "GreenHills Academy" },
    { src: "/images/whatwedo.png", alt: "RociFilm Logo" },
  ];

  return (
    <div className="border w-full bg-primary/10 rounded-md grid overflow-hidden z-0 p-2">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center w-full items-center relative"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain bg-cover h-full w-full mx-6"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
