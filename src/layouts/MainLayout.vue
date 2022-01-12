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

    <q-drawer
      v-model="leftDrawerOpen"
    >
    <div class="sidebar">
      <q-img
        src="~assets/dashboard/logo.png"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-scroll-area class="fit ">
        <q-list style="margin-top:40px;">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-expansion-item
            expand-separator
            header-style="padding-left:30px;"
            expand-icon-class="text-primary"
          >
          <template v-slot:header >
            <q-item-section>
              <q-item-label class=" text-primary">
                <q-img
                  :src="require(`assets/icon/master.svg`)"
                  spinner-color="primary"
                  spinner-size="5px"
                  style="width:18px;height:18px;"
                  class="q-mr-sm"
                />
                Master
              </q-item-label>
            </q-item-section>
          </template>
            <EssentialLink
            style="padding-left:60px;"
              v-for="link in master"
              :key="link.title"
              v-bind="link"
            />
            
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            header-style="padding-left:30px;"
            expand-icon-class="text-primary"
            
          >
          <template v-slot:header >
            <q-item-section>
              <q-item-label class=" text-primary">
                <q-img
                  :src="require(`assets/icon/utility.svg`)"
                  spinner-color="primary"
                  spinner-size="5px"
                  style="width:18px;height:18px;"
                  class="q-mr-sm"
                />
                Utility
              </q-item-label>
            </q-item-section>
          </template>
            <EssentialLink
            style="padding-left:60px;"
              v-for="link in utility"
              :key="link.title"
              v-bind="link"
            />
            
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            header-style="padding-left:30px;"
            expand-icon-class="text-primary"
            
          >
          <template v-slot:header >
            <q-item-section>
              <q-item-label class=" text-primary">
                <q-img
                  :src="require(`assets/icon/laporan.svg`)"
                  spinner-color="primary"
                  spinner-size="5px"
                  style="width:18px;height:18px;"
                  class="q-mr-sm"
                />
                Laporan
              </q-item-label>
            </q-item-section>
          </template>
            <EssentialLink
            style="padding-left:60px;"
              v-for="link in laporan"
              :key="link.title"
              v-bind="link"
            />
            
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            header-style="padding-left:30px;"
            expand-icon-class="text-primary"
            
          >
          <template v-slot:header >
            <q-item-section>
              <q-item-label class=" text-primary">
                <q-img
                  :src="require(`assets/icon/transaksi.svg`)"
                  spinner-color="primary"
                  spinner-size="5px"
                  style="width:18px;height:18px;"
                  class="q-mr-sm"
                />
                Transaksi
              </q-item-label>
            </q-item-section>
          </template>
            <EssentialLink
            style="padding-left:60px;"
              v-for="link in transaksi"
              :key="link.title"
              v-bind="link"
            />
            
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </div>
    </q-drawer>

    <q-page-container class="bg-admin">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { menu,transaksi,master,utility,laporan } from 'src/common/menu'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(true)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data(){
    return{
      essentialLinks: menu,
      transaksi: transaksi,
      master:master,
      utility:utility,
      laporan:laporan,
      texpand:false
    }
  },
  computed:{
      transaksiexpand(){
        return this.transaksi.some(tr => tr.link === this.$route.name) 
      }
  }
})
</script>
