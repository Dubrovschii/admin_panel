// adminOptions/components/ImageShow.jsx
import React from "react";

const ImageShow = (props) => {
  const { record, property } = props;
  const imagePath = record.params[property.name]?.path;

  return (
    <div>
      {imagePath ? (
        <img
          src={imagePath}
          alt="Uploaded content"
          style={{ width: "50px", height: "auto" }}
        />
      ) : (
        <span>No image123</span>
      )}
    </div>
  );
};

export default ImageShow;
