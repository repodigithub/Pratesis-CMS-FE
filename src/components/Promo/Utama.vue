<template>
<breadcrumb  :upload="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" style="color:#00000073;"/>
    </template>
    <template v-slot:rightside-content v-if="userRole != 'GA'">
        <q-btn color="secondary"  no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="openAdd">
            <q-icon name="add" />
            Add New
        </q-btn>
    </template>
</breadcrumb>

    <div class="row q-pa-lg">
        <component :is="userTampil"/>
    </div>

    <add-edit-promo v-model:modalPromo="modalPromo" v-if="modalPromo"/>

</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import HeadOffice from './HeadOffice.vue'
import Distributor from './Distributor.vue'

export default {
    setup(){
        const modalPromo = ref(false)
        return {
            modalPromo
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        HeadOffice,
        Distributor,
        'add-edit-promo' : defineAsyncComponent(()=> import('./utama/AddEditPromo'))
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['GA','DI'].indexOf(role) >= 0 ? '' : role
        },
        userTampil(){
            return this.userRole ? 'HeadOffice' : 'Distributor'
        }
    },
}
</script>

<style>

</style>