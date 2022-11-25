<template>
  <q-page class="row items-center justify-evenly">
    <q-select
      v-model="selectedHost"
      :options="hosts"
      :loading="!hosts"
      label="Filter by host"
    />
    <div class="q-pa-md scroll-x">
      <q-table title="Nginx Logs" :rows="filteredLogs" :columns="columns" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { LogItem, Host } from 'src/models/index';
import { useLogsStore } from 'stores/logs';

const logsStore = useLogsStore();

const selectedHost = ref<Host['ip']>();

const filteredLogs = computed(() =>
  logsStore.logList.filter(
    (l) =>
      !selectedHost.value || (!!l.host?.ip && selectedHost.value == l.host.ip)
  )
);
const hosts = computed(() =>
  [...new Set(logsStore.logList.map((l) => l.host?.ip))].filter((h) => !!h)
);

const columns = [
  {
    name: 'timestamp',
    label: 'Дата',
    field: '@timestamp',
    sortable: true,
  },
  // {
  //   name: 'message',
  //   label: 'Сообщение',
  //   field: 'message',
  // },
  { name: 'response', label: 'Код ответа', field: 'response', sortable: true },
  { name: 'auth', label: 'auth', field: 'auth' },
  { name: '@version', label: '@version', field: '@version' },
  {
    name: 'service',
    label: 'service',
    field: (row: LogItem) => row.service?.type,
  },
  { name: 'httpversion', label: 'httpversion', field: 'httpversion' },
  { name: 'xforwardedfor', label: 'xforwardedfor', field: 'xforwardedfor' },
  {
    name: 'tags',
    label: 'tags',
    field: 'tags',
    format: (val: string[]) => val.join(', '),
  },
  {
    name: 'useragentDeivce',
    label: 'useragentDeivce',
    field: (row: LogItem) => row.useragent?.device,
  },
  {
    name: 'useragentName',
    label: 'useragentName',
    field: (row: LogItem) => row.useragent?.name,
  },
  {
    name: 'useragentOS',
    label: 'useragentOS',
    field: (row: LogItem) => row.useragent?.os,
  },
  {
    name: 'useragentVersion',
    label: 'useragentVersion',
    field: (row: LogItem) => row.useragent?.version,
  },
  { name: 'log', label: 'log', field: (row: LogItem) => row.log?.syslog },
  // {
  //   name: 'event',
  //   label: 'event',
  //   field: (row: LogItem) => row.event.original,
  // },
  {
    name: 'hostHostname',
    label: 'hostHostname',
    field: (row: LogItem) => row.host?.hostname,
  },
  {
    name: 'hostIP',
    label: 'hostIP',
    field: (row: LogItem) => row.host?.ip,
  },
  {
    name: 'client_ip',
    label: 'client_ip',
    field: (row: LogItem) => row.client_ip?.ip,
  },
  { name: 'ident', label: 'ident', field: 'ident' },
  {
    name: 'process',
    label: 'process',
    field: (row: LogItem) => row.process?.name,
  },
  { name: 'referrer', label: 'referrer', field: 'referrer' },
  { name: 'verb', label: 'verb', field: 'verb' },
  { name: 'bytes', label: 'bytes', field: 'bytes' },
];
</script>
