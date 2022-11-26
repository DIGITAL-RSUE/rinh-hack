<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLogsStore } from './stores/logs'
useLogsStore().fetch()
</script>
