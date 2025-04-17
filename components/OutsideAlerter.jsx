import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref, callback) {
  useEffect(() => {
    if (!ref.current) return;
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({ ref, onClickOutside, children }) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}