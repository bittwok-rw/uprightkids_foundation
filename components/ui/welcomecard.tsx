import type React from "react";

interface WelcomeCardProps {
  backgroundImage: string;
  background?: string;
  children: React.ReactNode;
  height?: string;
  contentStyles?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  backgroundImage,
  children,
  contentStyles,
}) => {
  return (
    <div
      className={`w-full flex min-h-[90vh] py-8 justify-center items-center ${contentStyles}`}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(
              to right,
              rgba(0, 0, 0, 0.91), 
              rgba(0, 0, 0, 0.1)
            ), 
            url('${backgroundImage}')`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: backgroundImage ? "transparent" : "#f8f9fa", // Light background if no image
      }}
    >
      <div className="w-[80%]">{children}</div>
    </div>
  );
};

export default WelcomeCard;
