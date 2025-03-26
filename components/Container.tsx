interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-5 sm:px-10 md:px-8 lg:px-24 py-10 sm:py-10 md:py-10 lg:py-12 ${className}`}
    >
      {children}
    </div>
  );
}
