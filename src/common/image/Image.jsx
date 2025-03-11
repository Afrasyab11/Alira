import React from "react";
import { checkNullOrEmpty } from "../../utils/utils";

export const Image = ({
  src = "",
  alt = "english logo",
  className = "w-full h-full",
  title = "",
  onClick,
  placeholder = true,
  placholderImg,
}) => {
  let imageUrl =
    checkNullOrEmpty(src) && placeholder ? placholderImg ?? "" : src;

  const handleError = () => {
    imageUrl = image_palceholder;
  };

  return (
    <img
      src={imageUrl}
      alt={alt}
      title={title}
      className={"cursor-pointer " + className}
      onError={handleError}
      onClick={onClick}
    />
  );
};
