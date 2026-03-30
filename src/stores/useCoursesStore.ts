import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { useGoogleScriptStore } from "@/stores/useGoogleScriptStore";

export const useCoursesStore = defineStore("courses", () => {
  const googleScriptStore = useGoogleScriptStore();

  const courses = ref<string[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCourses(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const result =
        await googleScriptStore.executeScript<string[]>("courseNames");
      if (result) {
        courses.value = result;
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      courses.value = [];
    } finally {
      loading.value = false;
    }
  }

  return {
    courses: readonly(courses),
    loading: readonly(loading),
    error: readonly(error),
    fetchCourses,
  };
});
