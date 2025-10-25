const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function transformLinkImage(link: string) {
  return `${BASE_URL}${link}`;
}
