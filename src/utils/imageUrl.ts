import defaultProductImage from "../assets/alt-product-image.png";

export const getImageUrl = (imagePath: string | undefined | null): string => {
  const API_URL = import.meta.env.VITE_API_URL || "";
  const BASE_URL = API_URL.replace(/\/api$/, "");

  if (!imagePath || imagePath === "") {
    return defaultProductImage;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  if (!BASE_URL) {
    return normalizedPath;
  }

  return `${BASE_URL}${normalizedPath}`;
};
