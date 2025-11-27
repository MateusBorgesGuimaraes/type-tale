"use server";

import { revalidateTag } from "next/cache";

export async function revalidateHighlights() {
  revalidateTag("highlights-paginated");
  revalidateTag("highlights");
}
