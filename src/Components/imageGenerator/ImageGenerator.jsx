import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";
const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
 
  const imageGenerator = async () => {
    if (inputRef.current.value === "") return 0;
    const response = await fetch(
      "https://api.edenai.run/v2/image/generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmI3ZGJmMGYtNzdlNC00ZTdhLTg3NzMtZWVmYTFlZTJiOTQ2IiwidHlwZSI6ImFwaV90b2tlbiJ9.znoUKUKj1pyKW-2p_WSz0mqalIFrHZ1rSXHj5_I6lug`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          providers: ["edenai"],
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
          response_format: "url",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
