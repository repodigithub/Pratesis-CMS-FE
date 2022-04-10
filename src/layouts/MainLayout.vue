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
          <div class="text-primary font-normal">
            {{role}}
            <q-icon name="expand_more" size="18px"/>
          </div>
          <!-- <q-btn color="primary" icon-right="expand_more" :label="roles" no-caps flat dense  class="font-normal"/> -->
        </q-toolbar-title>
        <div class="row items-center cursor-pointer" @click="showing != showing">
          <div class="font-normal q-mr-sm">Hi, {{name}}</div>
          <q-avatar class="btn-radius" color="primary" text-color="white">{{name.charAt(0)}}</q-avatar>
          <q-menu style="width:150px;" v-model="showing">
            <q-list >
              <q-item>
                <q-item-section class="text-bold">{{name}} </q-item-section>
              </q-item>
              <q-item clickable @click="$router.push( {name: 'Ubah Profil'} )">
                <q-item-section>Profile </q-item-section>
                <q-item-section side center>
                  <q-item-label class="text-primary">Edit</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="$store.dispatch('auth/logout')">
                <q-item-section class="text-warning">Logout</q-item-section>
                <q-item-section side center>
                  <q-icon name="logout" color="warning" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
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

import { defineComponent,ref,onMounted,computed } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'MainLayout',
  setup(){
    const showing = ref(false)
    const { name } = usePratesis()
    const { getData } = useService()
    const store = useStore()
    onMounted(()=>{
      getData(`user-group?search=${store.state.auth.user.kode_group}`,false)
      .then(response=>{
        store.dispatch('auth/changeRole',response.data.data.data[0].nama_group)
      })
    })

    const role = computed(()=>{
      return store.state.auth.role
    })
    return {
      showing,
      name,
      role
    }
  },
  components: {
    Sidebar
  },

})
</script>
