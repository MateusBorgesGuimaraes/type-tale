export function cutText(text: string, characters: number): string {
  return text.slice(0, characters - 1) + "...";
}
