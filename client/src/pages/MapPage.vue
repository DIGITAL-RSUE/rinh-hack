<template>
  <q-page>
    <ol-map
      ref="map"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-cluster :distance="40">
          <ol-source-vector>
            <ol-feature v-for="(point, index) in points" :key="index">
              <ol-geom-point
                :coordinates="[ point.location.lon,point.location.lat,]"
              ></ol-geom-point>
              <ol-style>
                <ol-style-circle :radius="10">
                  <ol-style-fill color="red"></ol-style-fill>
                  <ol-style-stroke color="white" :width="3"></ol-style-stroke>
                </ol-style-circle>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-source-cluster>

        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

          <ol-style-circle :radius="10">
            <ol-style-fill color="#3399CC"></ol-style-fill>
            <ol-style-stroke color="#fff" :width="1"></ol-style-stroke>
          </ol-style-circle>
          <ol-style-text>
            <ol-style-fill color="#fff"></ol-style-fill>
          </ol-style-text>
        </ol-style>
      </ol-vector-layer>

      <ol-fullscreen-control />

      <ol-overviewmap-control>
        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>
      </ol-overviewmap-control>

      <ol-scaleline-control />
      <ol-rotate-control />
      <ol-zoom-control />
      <ol-zoomslider-control />
    </ol-map>
  </q-page>
</template>

<script setup lang="ts">
import { useLogsStore } from 'stores/logs'
import { computed, ref } from 'vue'

const logsStore = useLogsStore();

const center = ref([40, 40]);
const projection = ref('EPSG:4326');
const zoom = ref(8);
const rotation = ref(0);

const points = computed(() =>
  logsStore.logList
    .filter((l) => !!l.client_ip?.geo)
    .map((l) => l.client_ip.geo)
);

const overrideStyleFunction = (feature: any, style: any) => {
  let clusteredFeatures = feature.get('features');
  let size = clusteredFeatures.length;

  style.getText().setText(size.toString());
};
</script>
