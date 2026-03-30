import { ref, readonly } from "vue";
import { runScript } from "@/utils/GoogleScriptAPI";

const courses = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchCourses(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const coursesRecord = await runScript("courseNames");
    courses.value = coursesRecord as string[];
    error.value = null;
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    courses.value = [];
  } finally {
    loading.value = false;
  }
}

export function useCourses() {
  return {
    courses: readonly(courses),
    loading: readonly(loading),
    error: readonly(error),
    fetchCourses,
  };
}
