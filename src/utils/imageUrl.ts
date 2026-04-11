const API_BASE_URL = "https://authpearlineapi.runasp.net";

export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) {
    return "/placeholder.png";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
