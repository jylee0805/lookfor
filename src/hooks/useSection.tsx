import { useEffect, useState } from "react";
import { ViewState } from "../types";

const useSectionData = (sectionName: string, state: ViewState) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const hasData = state.allPost?.some((item) => item.section === sectionName) ?? false;
  const sectionData = state.allPost?.find((view) => view.section === sectionName);
  const image = sectionData?.image || "";

  return { hasData, sectionData, image, mousePosition, handleMouseMove, windowWidth };
};

export default useSectionData;
