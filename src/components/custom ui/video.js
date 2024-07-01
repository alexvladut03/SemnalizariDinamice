"use client";
import React, { useRef, useEffect } from "react";

const Video = ({ url, width, height, rounded, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true;

      try {
        video.play();
      } catch (error) {
        console.warn("Autoplay failed:", error);
      }
    }
  }, []);
  return (
    <div className={rounded ? `rounded-xl overflow-hidden ${className}` : ""}>
      <video
        ref={videoRef}
        loop
        playsInline
        muted
        autoPlay
        className="object-cover"
      >
        <source src={url} type="video/mp4" />
        Browserul tău nu suportă video HTML5.
      </video>
    </div>
  );
};

export default Video;
