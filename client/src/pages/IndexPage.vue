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
        :rows="logsStore.logList"
        :loading="loading"
        :columns="columns"
        v-model:pagination="pagination"
        :rows-per-page-options="[10, 50, 100, 150]"
        @request="onRequest"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Host, LogItem } from 'src/models/index'
import { useLogsStore } from 'stores/logs'
import { computed, onMounted, ref } from 'vue'

const logsStore = useLogsStore();

const tableRef = ref();

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: logsStore.elasticData?.hits.total.value || 301,
});
let selectedHost = ref<Host['ip']>();
let loading = ref(false);

const hosts = computed(() =>
  [...new Set(logsStore.logList.map((l) => l.host?.ip))].filter((h) => !!h)
);

const onRequest = async (props: {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  console.log(page)
  loading.value = true;

  await logsStore.fetch({
    from: page,
    size: rowsPerPage,
  });

  if (!!selectedHost.value)
    logsStore.logList.filter(
      (l) => !!l.host?.ip && selectedHost.value == l.host.ip
    );

  loading.value = false;
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
  pagination.value.rowsNumber = logsStore.elasticData?.hits.total.value || 301;
};

onMounted(() => tableRef.value.requestServerInteraction());

const columns = [
  {
    name: 'timestamp',
    label: 'Дата',
    field: '@timestamp',
    sortable: true,
  },
  { name: 'response', label: 'Код ответа', field: 'response', sortable: true },
  { name: '@version', label: 'Ver.', field: '@version' },
  { name: 'httpversion', label: 'httpversion', field: 'httpversion' },
  {
    name: 'useragentName',
    label: 'useragentName',
    field: (row: LogItem) => row.useragent?.name,
  },
  {
    name: 'useragentVersion',
    label: 'useragentVersion',
    field: (row: LogItem) => row.useragent?.version,
  },
  {
    name: 'host',
    label: 'host',
    field: (row: LogItem) => row.host?.ip +' - ' + row.host?.hostname,
  },
  {
    name: 'client_ip',
    label: 'client ip',
    field: (row: LogItem) => row.client_ip?.ip,
  },
  {
    name: 'client_city',
    label: 'client city',
    field: (row: LogItem) => row.client_ip?.geo.city_name,
  },
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
