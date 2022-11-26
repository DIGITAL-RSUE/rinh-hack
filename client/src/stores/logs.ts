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
      from: 5
    } as Record<string,any>) {
      try {
        const { data } = await api.post<ElasticResponse>('api', JSON.stringify(query));
        this.elasticData = data;
        console.log(data.hits.hits.length);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
