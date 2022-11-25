<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLogsStore } from 'stores/logs';
import { watchEffect } from 'vue';

const logsStore = useLogsStore();

watchEffect(() => logsStore.fetch());
</script>
