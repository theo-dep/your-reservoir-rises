<template>
  <div class="file-list">
    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state state--error">⚠ {{ error }}</div>
    <div v-else-if="files.length === 0" class="state">
      Aucun fichier trouvé.
    </div>
    <ul v-else>
      <li v-for="file in files" :key="file.id" class="file-row">
        <span class="file-icon">{{ mimeIcon(file.mimeType) }}</span>
        <span class="file-name">{{ file.name }}</span>
        <code class="file-id">{{ file.id }}</code>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { DriveFile } from "@/types/google.d.ts";

defineProps<{
  files: readonly DriveFile[];
  loading: boolean;
  error: string | null;
}>();

function mimeIcon(mime: string): string {
  if (!mime) return "📄";
  if (mime.includes("folder")) return "📁";
  if (mime.includes("spreadsheet") || mime.includes("excel")) return "📊";
  if (mime.includes("presentation") || mime.includes("powerpoint")) return "📑";
  if (mime.includes("document") || mime.includes("word")) return "📝";
  if (mime.includes("image")) return "🖼";
  if (mime.includes("pdf")) return "📕";
  if (mime.includes("video")) return "🎬";
  if (mime.includes("audio")) return "🎵";
  return "📄";
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-row {
  display: grid;
  grid-template-columns: 1.5rem 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--c-line);
}
.file-row:last-child {
  border-bottom: none;
}

.file-icon {
  font-size: 1rem;
}

.file-name {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-id {
  font-size: 0.7rem;
  color: var(--c-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.state {
  padding: 2rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}

.state--error {
  color: #c0392b;
}
</style>
