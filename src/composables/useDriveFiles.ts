import { ref, readonly } from "vue";
import type { DriveFile } from "@/types/google.d.ts";

const files = ref<DriveFile[]>([]);
const error = ref<string | null>(null);
const loading = ref(false);

// Fetch metadata for first 10 files.
async function fetchFiles(pageSize = 10): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const response = await window.gapi.client.drive.files.list({
      pageSize,
      fields: "files(id, name, mimeType, modifiedTime)",
    });
    files.value = response.result.files ?? [];
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    files.value = [];
  } finally {
    loading.value = false;
  }
}

function clearFiles(): void {
  files.value = [];
  error.value = null;
}

export function useDriveFiles() {
  return {
    files: readonly(files),
    error: readonly(error),
    loading: readonly(loading),
    fetchFiles,
    clearFiles,
  };
}
