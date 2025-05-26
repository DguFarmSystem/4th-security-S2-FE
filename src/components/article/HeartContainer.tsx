import IconHeart from "./IconHeart";
import { useState, useEffect, useRef } from "react";

interface IHeartContainerProps {
  isHeartClicked: boolean;
  setIsHeartClicked: React.Dispatch<React.SetStateAction<boolean>>;
  heartCount: number;
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function HeartContainer({
  isHeartClicked,
  setIsHeartClicked,
  heartCount,
  setHeartCount,
}: IHeartContainerProps) {
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = () => {
    setIsHeartClicked((prev) => !prev);
    setHeartCount((prev) => (isHeartClicked ? prev - 1 : prev + 1));
    setAnimate(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const style = animate
    ? {
        transform: "scale(1.6)",
        transition: "transform 0.15s ease-in-out",
      }
    : {
        transform: "scale(1)",
        transition: "transform 0.15s ease-in-out",
      };
    
  return (
    <div className="w-full flex items-center justify-start py-2">
      <button onClick={handleClick} style={style}>
        <IconHeart isHeartClicked={isHeartClicked} />
      </button>
      <p className="text-xs text-[#E8EBED] ml-2">
        좋아요 {heartCount}
      </p>
    </div>
  )
};
