import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { useGoogleScriptStore } from "@/stores/useGoogleScriptStore";

export const useBoostsStore = defineStore("boosts", () => {
  const googleScriptStore = useGoogleScriptStore();

  const boosts = ref<string[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchBoosts(date: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const result = await googleScriptStore.executeScript<string[]>(
        "boostNames",
        [date],
      );
      if (result) {
        boosts.value = result;
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      boosts.value = [];
    } finally {
      loading.value = false;
    }
  }

  return {
    boosts: readonly(boosts),
    loading: readonly(loading),
    error: readonly(error),
    fetchBoosts,
  };
});
