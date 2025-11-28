"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAnnouncements(id?: string) {
  revalidateTag("announcements-paginated");
  revalidateTag("announcements");
  if (id) revalidateTag(`annoucement-${id}`);
}
