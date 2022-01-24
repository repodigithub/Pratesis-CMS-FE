<template>
<q-page >
    <div class="row">
        <q-card flat class="col-12">
            <q-card-section class="q-py-sm">
                <div class="row justify-between">
                    <q-breadcrumbs>
                        <!-- <q-breadcrumbs-el icon="home" to="/" />
                        <q-breadcrumbs-el label="Docs" icon="widgets"  />
                        <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
                        <q-breadcrumbs-el label="User" style="color:#00000073;"  />
                    </q-breadcrumbs>
                    <q-btn color="secondary" label="Upload" no-caps unelevated icon="upload_file" />
                </div>
            </q-card-section>
        </q-card>
    </div>
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card q-mb-lg" flat >
                <q-card-section class="row items-end q-px-md">
                    <div class="col-5">
                        <div class="font-normal">Pencarian :</div>
                        <div class="row">
                            <q-select v-model="kode" :options="optkode" dense outlined bg-color="primary" class="text-white"/>
                            <q-input v-model="text" placeholder="Ex: ASM Medan" dense outlined>
                                <template v-slot:append>
                                    <q-icon
                                        name="search"
                                    />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class="col-2 q-ml-md">
                        <div class="font-normal">Group Pengguna :</div>
                        <q-select v-model="role" :options="optrole" dense outlined />
                    </div>
                    <div class="col-3 q-ml-md">
                        <div class="font-normal">Status :</div>
                        <q-btn-toggle
                        unelevated
                            v-model="status"
                            spread
                            no-caps
                            toggle-color="primary"
                            color="primary4"
                            text-color="primary"
                            :options="[
                            {label: 'Aktif', value: 'one'},
                            {label: 'Non Aktif', value: 'two'}
                            ]"
                            class="my-custom-toggle"
                        />
                    </div>
                    <div class=" q-ml-lg">
                        <q-btn color="primary" label="Apply" no-caps unelevated/>
                    </div>
                </q-card-section>
            </q-card>
            <q-card class="own-card" flat>
                <q-card-section>
                    <div class="row justify-between">
                        <div class="col-2 font-medium">
                            Administrator
                        </div>
                            <q-btn color="secondary" label="Add User" no-caps unelevated/>
                    </div>
                    <q-btn :color="dtabel === 'DataUser' ? 'black' : 'primary'" label="Data User" no-caps flat :class="dtabel === 'DataUser' ? 'btnMenu' : ''" @click="dtabel = 'DataUser'"/>
                    <q-btn :color="dtabel === 'RequestData' ? 'black' : 'primary'" label="Request Data" no-caps flat :class="dtabel === 'RequestData' ? 'btnMenu' : ''" @click="dtabel = 'RequestData'"/>
                    <component :is="dtabel" class="q-mt-lg"/>
                </q-card-section>
            </q-card>
        </div>
    </div>
</q-page>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components:{
        DataUser: defineAsyncComponent(() => import('components/User/Datauser')),
        RequestData: defineAsyncComponent(() => import('components/User/RequestData')),
    },
    data(){
        return{
            kodeuser:'',
            role:'Head Office',
            optrole:['Head Office','Depot','Distributor','Super Admin'],
            kode:'Kode Pengguna',
            optkode:['Kode Pengguna','Nama Pengguna'],
            status:'one',
            dtabel:'DataUser'
        }
    }
}
</script>

<style lang="scss">
.my-custom-toggle{
    border: 1px solid $primary;
}
.btnMenu > .q-btn__content > .block{
    border-bottom:2px solid $primary;
}
</style>