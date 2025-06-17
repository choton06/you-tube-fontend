import React from "react";

// Default Avatar URL (you can customize this)
const defaultAvatar = "https://via.placeholder.com/150"; // A placeholder image

const Avatar = ({ src, alt = "User Avatar", size = "40px" }) => {
  // If the src is not provided or invalid, fallback to the default avatar
  const avatarSrc = src || defaultAvatar;

  return (
    <img
      src={avatarSrc}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
};

export default Avatar;
