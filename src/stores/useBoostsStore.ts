import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { runScript } from "@/utils/GoogleScriptAPI";

export const useBoostsStore = defineStore("boosts", () => {
  const boosts = ref<string[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchBoosts(date: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const boostsRecord = await runScript("boostNames", [date]);
      boosts.value = boostsRecord as string[];
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
