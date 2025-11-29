"use server";

import { revalidateTag } from "next/cache";

export async function revalidateChapters(param: string) {
  revalidateTag(`stories-${param}-chapters-author`);
}
