<template>
  <q-page>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :width="200"
      :height="200"
    />
  </q-page>
  {{ logsByDate }}
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useLogsStore } from 'stores/logs';
import { computed } from 'vue';
import moment from 'moment';

const logsStore = useLogsStore();
const logsByDate = computed(() =>
  logsStore.logList.reduce((acc, c) => {
    if (!Array.isArray(acc[moment(c['@timestamp']).format('YYYY-MM')]))
      acc[moment(c['@timestamp']).format('YYYY-MM')] = [];

    acc[moment(c['@timestamp']).format('YYYY-MM')].push(c);
    return acc;
  }, {})
);

const chartData = computed(() => ({
  labels: Object.keys(logsByDate.value),
  datasets: { data: Object.values(logsByDate.value).map((o) => o.length) },
}));

const chartOptions = { responsive: true };

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
</script>
