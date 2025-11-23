"use server";
import { createVolume, updateVolume } from "@/lib/api/volume";
import { UpdateVolumeSchemaData, VolumeSchemaData } from "@/schemas/volume";
import { revalidateTag } from "next/cache";
type ActionResult = {
  success: boolean;
  message?: string | string[];
  statusCode?: number;
  data?: any;
};

export async function createVolumeAction(
  data: VolumeSchemaData,
  storyId: string,
  slug: string,
): Promise<ActionResult> {
  try {
    const response = await createVolume(data, storyId);
    revalidateTag(`stories-${slug}-chapters-author`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error when create a volume.",
      statusCode: error?.statusCode || 500,
    };
  }
}

export async function updateVolumeAction(
  body: UpdateVolumeSchemaData,
  volumeId: string,
  slug: string,
): Promise<ActionResult> {
  try {
    const response = await updateVolume(body, volumeId);
    revalidateTag(`stories-${slug}-chapters-author`);

    return {
      success: true,
      message: response.message,
      statusCode: response.statusCode,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while updating volume.",
      statusCode: error?.statusCode || 500,
    };
  }
}
