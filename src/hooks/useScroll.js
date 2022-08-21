import { useRef, useEffect } from "react";

export const useScroll = (dependency ) => {
    const elRef = useRef(null);

    useEffect(() => {
        if(elRef.current) {
            elRef.current.scrollIntoView({behavior: 'smooth'})
        }

    }, [dependency])

    return [ elRef ];
}
