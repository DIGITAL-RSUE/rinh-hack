import { defineStore } from 'pinia';
import { ElasticResponse, LogItem } from 'src/models/index';
import { api } from 'boot/axios';

export const useLogsStore = defineStore('logs', {
  state: () => ({
    elasticData: undefined as ElasticResponse | undefined,
  }),
  getters: {
    logList: (state): LogItem[] =>
      state.elasticData?.hits.hits.map((h) => h._source) || [],
  },
  actions: {
    async fetch(query = '') {
      try {
        const { data } = await api.post<ElasticResponse>('api', query);
        this.elasticData = data;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
