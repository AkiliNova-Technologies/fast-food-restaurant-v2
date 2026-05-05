const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getImageUrl(path?: string | null) {
  if (!path) return "/placeholder-food.jpg";

  if (
    path.startsWith("blob:") ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }

  return `${API_BASE_URL}/${path}`;
}