import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { ElasticResponse, LogItem } from 'src/models/index'

export const useLogsStore = defineStore('logs', {
  state: () => ({
    elasticData: undefined as ElasticResponse | undefined,
  }),
  getters: {
    logList: (state): LogItem[] =>
      state.elasticData?.hits.hits.map((h) => h._source) || [],
  },
  actions: {
    async fetch(query = {
      from: 1,
      size: 10
    } as Record<string,any>) {
      try {
        const { data } = await api.post<ElasticResponse>('api', JSON.stringify(query));
        this.elasticData = data;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
