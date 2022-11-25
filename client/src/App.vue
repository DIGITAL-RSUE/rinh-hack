<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLogsStore } from 'stores/logs'

const logsStore = useLogsStore();

logsStore.fetch()
</script>
