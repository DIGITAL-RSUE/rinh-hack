<template>
  <q-page>
    <div class="row items-center">
      <h4 class="q-mr-md">Количество запросов по:</h4>
      <q-select

      outlined
        v-model="chartType"
        :options="chartTypes"

        option-label="label"

      />
    </div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      chart-id="Logs"
    />
  </q-page>
</template>

<script setup lang="ts">
import {
BarElement,
CategoryScale,
Chart as ChartJS,
Legend,
LinearScale,
Title,
Tooltip
} from 'chart.js'
import moment from 'moment'
import { useLogsStore } from 'stores/logs'
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'

const chartTypes = [
  { label: 'По месяцам', value: 'YYYY-MM' },
  { label: 'По дням', value: 'YYYY-MM-DD' },
  { label: 'По часам', value: 'YYYY-MM-DD-HH' },
  { label: 'По годам', value: 'YYYY' },
];

const chartType = ref(chartTypes[0]);

const logsStore = useLogsStore();

const logsByDate = computed(() =>
  logsStore.logList.reduce((acc, c) => {
    const key = moment(c['@timestamp']).format(chartType.value.value);
    acc[key] = acc[key] || [];
    acc[key].push(c);
    return acc;
  }, {} as Record<string, any[]>)
);

const chartData = computed(() => ({
  labels: Object.keys(logsByDate.value),
  datasets: [
    {
      label: 'Кол-во запросов',
      data: Object.values(logsByDate.value).map((o) => o.length),
      backgroundColor: Object.values(logsByDate.value).map(
        (_) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
      ),
    },
  ],
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
