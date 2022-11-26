<template>
  <q-page class="row items-center justify-evenly">
    <div class="row items-center">
      <h4 class="q-mr-md">Фильтр по хосту</h4>
      <q-select
        v-model="selectedHost"
        :options="hosts"
        :loading="!hosts"
        outlined
      />
    </div>
    <div class="q-pa-md scroll-x">
      <q-table
        ref="tableRef"
        title="Nginx Logs"
        :rows="filteredLogs"
        :loading="loading"
        :columns="columns"
        :pagination="initialPagination"
        :rows-per-page-options="[10, 50, 100, 150]"
        @request="onRequest"
        @update:pagination="initialPagination = $event"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Host, LogItem } from 'src/models/index';
import { useLogsStore } from 'stores/logs';
import { computed, onMounted, ref, watch } from 'vue';

const logsStore = useLogsStore();
const query = ref<Record<string, any>>({});

let selectedHost = ref<Host['ip']>();

const filteredLogs = computed(() =>
  logsStore.logList.filter(
    (l) =>
      !selectedHost.value || (!!l.host?.ip && selectedHost.value == l.host.ip)
  )
);
const hosts = computed(() =>
  [...new Set(logsStore.logList.map((l) => l.host?.ip))].filter((h) => !!h)
);
let loading = ref(false);
const tableRef = ref();
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: logsStore.elasticData?.hits.total.value || 301,
});
const loadData = async (
  page: number,
  count: number,
  sub: Record<string, any>
) => {
  loading.value = true;
  let payload: Record<string, any> = {
    from: page,
    size: count,
  };
  if (!!sub && Object.values(sub).length > 0)
    payload = { ...payload, query: sub };
  await logsStore.fetch(payload);

  loading.value = false;
};
const onRequest = async (props: {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;

  await loadData(page, rowsPerPage, query.value);
  initialPagination.value.page = page;
  initialPagination.value.rowsPerPage = rowsPerPage;
  initialPagination.value.sortBy = sortBy;
  initialPagination.value.descending = descending;
  initialPagination.value.rowsNumber =
    logsStore.elasticData?.hits.total.value || 301;
};

watch(
  query,
  async () =>
    await loadData(
      initialPagination.value.page,
      initialPagination.value.rowsPerPage,
      query.value
    )
);

onMounted(() => tableRef.value.requestServerInteraction());
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
