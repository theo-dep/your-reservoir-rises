import { ref, readonly } from "vue";
import { runScript } from "@/utils/GoogleScriptAPI";

const parcours = ref<string[]>([]);
const boosts = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchTables(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const [parcoursRecord, boostsRecord] = await Promise.all([
      runScript("courseNames"),
      runScript("boostNames"),
    ]);

    parcours.value = parcoursRecord as string[];
    boosts.value = boostsRecord as string[];
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    parcours.value = [];
    boosts.value = [];
  } finally {
    loading.value = false;
  }
}

function clearTables(): void {
  parcours.value = [];
  boosts.value = [];
  error.value = null;
}

export function useTables() {
  return {
    parcours: readonly(parcours),
    boosts: readonly(boosts),
    loading: readonly(loading),
    error: readonly(error),
    fetchTables,
    clearTables,
  };
}
