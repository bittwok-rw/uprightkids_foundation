interface PlayIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function PlayIcon({
  width = 68,
  height = 68,
  className = "",
}: PlayIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_b_53_1719)">
        <path
          d="M0.802734 34.0011C0.802734 15.6662 15.6662 0.802734 34.0011 0.802734C52.3361 0.802734 67.1995 15.6662 67.1995 34.0011C67.1995 52.3361 52.3361 67.1995 34.0011 67.1995C15.6662 67.1995 0.802734 52.3361 0.802734 34.0011Z"
          fill="#033AB9"
        />
      </g>
      <path
        d="M25.6816 38.744V28.9662C25.6816 24.7979 25.6816 22.7137 27.0392 21.9104C28.3968 21.107 30.2237 22.11 33.8775 24.116L42.2586 28.7173C45.9615 30.7503 47.813 31.7668 47.8537 33.356C47.8944 34.9452 46.0974 36.0552 42.5033 38.275L34.1223 43.4515C30.3872 45.7585 28.5196 46.912 27.1006 46.1206C25.6816 45.3292 25.6816 43.1341 25.6816 38.744Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_53_1719"
          x="-79.1973"
          y="-79.1973"
          width="226.396"
          height="226.397"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="40" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_53_1719"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_53_1719"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
