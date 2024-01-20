import { useEffect, useState } from "react";

const twBreakpoint = {
  xxs: "480px",
  xs: "576px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const breakpointInt = (str = "") => {
  return parseInt(str.replace("px", ""));
};

const breakpoint = {
  "2xl": breakpointInt(twBreakpoint["2xl"]), // 1536
  xl: breakpointInt(twBreakpoint.xl), // 1280
  lg: breakpointInt(twBreakpoint.lg), // 1024
  md: breakpointInt(twBreakpoint.md), // 768
  sm: breakpointInt(twBreakpoint.sm), // 640
  xs: breakpointInt(twBreakpoint.xs), // 576
  xxs: breakpointInt(twBreakpoint.xxs), // 480
};

const useResponsive = () => {
  const getAllSizes = (comparator = "smaller") => {
    const currentWindowWidth = window.innerWidth;
    return Object.fromEntries(
      Object.entries(breakpoint).map(([key, value]) => [
        key,
        comparator === "larger"
          ? currentWindowWidth > value
          : currentWindowWidth < value,
      ])
    );
  };

  const getResponsiveState = () => {
    const currentWindowWidth = window.innerWidth;
    return {
      windowWidth: currentWindowWidth,
      larger: getAllSizes("larger"),
      smaller: getAllSizes("smaller"),
    };
  };

  const [responsive, setResponsive] = useState(getResponsiveState());

  const resizeHandler = () => {
    const responsiveState = getResponsiveState();
    setResponsive(responsiveState);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsive.windowWidth]);

  return responsive;
};

export default useResponsive;
