<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> NGINX Logs analytics </q-toolbar-title>

        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink, {
EssentialLinkProps
} from 'components/EssentialLink.vue'
import { ref } from 'vue'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Table',
    caption: 'requests table',
    icon: 'table_chart',
    link: '/',
  },
  {
    title: 'Maps',
    caption: 'requests location',
    icon: 'location_searching',
    link: '/map',
  },
  {
    title: 'Graphs',
    caption: 'requests charts',
    icon: 'analytics',
    link: '/graphs',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
