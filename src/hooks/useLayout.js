import { useState, useEffect, useCallback } from "react";

const useLayout = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsLaptop(width >= 768);
    }, []);

    useEffect(() => {
        handleResize(); // ✅ Run on mount to set initial state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    return { isMobile, isLaptop };
};

export default useLayout;
