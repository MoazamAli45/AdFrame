import React from "react";

const VideoPlayer = ({ src, controls = true }) => {
  return (
    <div>
      <video width="600" height="400" controls={controls}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
