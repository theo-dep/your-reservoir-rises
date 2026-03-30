import { ref } from "vue";
import { defineStore } from "pinia";
import { runScript } from "@/utils/GoogleScriptAPI";

interface PendingRequest {
  controller: AbortController;
  requestId: number;
}

export const useGoogleScriptStore = defineStore("googleScript", () => {
  const pendingRequests = ref(new Map<string, PendingRequest>());

  function cancelRequest(functionName: string) {
    const request = pendingRequests.value.get(functionName);
    if (request) {
      request.controller.abort();
      pendingRequests.value.delete(functionName);
    }
  }

  async function executeScript<T>(
    functionName: string,
    parameters: string[] = [],
  ): Promise<T | null> {
    cancelRequest(functionName);

    const controller = new AbortController();
    const requestId = Date.now();

    pendingRequests.value.set(functionName, {
      controller,
      requestId,
    });

    try {
      const result = await runScript<T>(
        functionName,
        parameters,
        controller.signal,
      );

      const currentRequest = pendingRequests.value.get(functionName);
      if (currentRequest?.requestId === requestId) {
        return result;
      }

      return null;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return null;
      }

      throw error;
    } finally {
      const currentRequest = pendingRequests.value.get(functionName);
      if (currentRequest?.requestId === requestId) {
        pendingRequests.value.delete(functionName);
      }
    }
  }

  return { executeScript };
});
