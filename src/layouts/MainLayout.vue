<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          <q-btn color="primary" icon-right="expand_more" label="Head Office" no-caps flat dense  class="font-normal"/>
          <q-menu style="max-width:150px">
          <q-list >
            <q-item clickable>
              <q-item-section>Profil</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Setting</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Logout</q-item-section>
            </q-item>
            
          </q-list>
        </q-menu>
        </q-toolbar-title>
        <div class="font-normal q-mr-sm">Hi, Joko</div>
        <q-avatar class="btn-radius" color="primary" text-color="white">J</q-avatar>
      </q-toolbar>
    </q-header>

    <Sidebar />

    <q-page-container class="bg-admin">
      
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from 'components/Sidebar.vue'

import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Sidebar
  },

})
</script>
