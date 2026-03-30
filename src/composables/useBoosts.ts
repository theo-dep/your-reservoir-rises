import { ref, readonly } from "vue";
import { runScript } from "@/utils/GoogleScriptAPI";

const boosts = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchBoosts(date: string): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const boostsRecord = await runScript("boostNames", [date]);
    boosts.value = boostsRecord as string[];
    error.value = null;
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    boosts.value = [];
  } finally {
    loading.value = false;
  }
}

export function useBoosts() {
  return {
    boosts: readonly(boosts),
    loading: readonly(loading),
    error: readonly(error),
    fetchBoosts,
  };
}
