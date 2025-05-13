// adminOptions/components/ImageList.jsx
import React from "react";

const ImageList = (props) => {
  const { record, property } = props;
  const imageData = record.params[property.name];
  const firstImage = Array.isArray(imageData) ? imageData[0] : imageData;

  return (
    <div>
      {firstImage?.path ? (
        <img
          src={firstImage.path}
          alt="Thumbnail"
          style={{
            width: "50px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      ) : (
        <span>No image</span>
      )}
    </div>
  );
};

export default ImageList;
