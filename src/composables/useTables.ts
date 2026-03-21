import { ref, readonly } from "vue";
import { useSheetFile } from "@/composables/useSheetFile";

const { fetchTable } = useSheetFile();

const parcours = ref<string[]>([]);
const boosts = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchParcours(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const [parcoursRecord, boostsRecord] = await Promise.all([
      fetchTable("Parcours"),
      fetchTable("Boosts"),
    ]);

    parcours.value = parcoursRecord["Nom"];
    boosts.value = boostsRecord["Nom"];
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    parcours.value = [];
  } finally {
    loading.value = false;
  }
}

function clearParcours(): void {
  parcours.value = [];
  error.value = null;
}

export function useParcoursTable() {
  return {
    parcours: readonly(parcours),
    boosts: readonly(boosts),
    loading: readonly(loading),
    error: readonly(error),
    fetchParcours,
    clearParcours,
  };
}
