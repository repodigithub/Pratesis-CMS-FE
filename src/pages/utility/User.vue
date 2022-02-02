<template>
<q-page >
    <Breadcrumb>
        <template v-slot:leftside>
            <q-breadcrumbs-el label="User" style="color:#00000073;"  />
        </template>
        <template v-slot:rightside>
            <q-btn color="secondary" outline no-caps unelevated class="btn-one q-mr-lg" >
                <q-icon name="download" style="font-size:15px;"  class="q-mr-sm"/>
                <div>Download Template</div>
            </q-btn>
            <q-btn color="secondary" no-caps unelevated class="btn-one" >
                <q-icon name="upload_file" style="font-size:14px;" class="q-mr-sm"/>
                <div>Upload</div>
            </q-btn>
        </template>
    </Breadcrumb >
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card q-mb-lg" flat v-if="dtabel === 'DataUser'">
                <q-card-section class="row items-end q-px-md">
                    <div >
                        <div class="font-normal">Pencarian :</div>
                        <div class="row">
                            <q-select v-model="dataFilter.kode_pengguna" :options="optkode_pengguna" dense outlined emit-value  map-options bg-color="primary" dropdown-icon="expand_more" class="option-one" />
                            <q-input v-model="text" placeholder="Ex: ASM Medan" dense outlined class="option-two">
                                <template v-slot:append>
                                    <q-icon
                                        name="search"
                                        class="grey2"
                                    />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class=" q-ml-md">
                        <div class="font-normal">Group Pengguna :</div>
                        <q-select v-model="dataFilter.kode_group" :options="optkode_group"  emit-value  map-options dense outlined dropdown-icon="expand_more" class="option-three "/>
                    </div>
                    
                    <div class=" q-ml-md">
                        <q-btn color="primary" label="Apply" no-caps unelevated class="btn-one q-mr-md" @click="onFilter(dataFilter)" />
                        <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="onReset" v-if="resetFilter"/>
                    </div>
                </q-card-section>
            </q-card>
            <q-card class="own-card" flat>
                <q-card-section>
                    <div class="row justify-between">
                        <div class="col-2 font-medium">
                            Administrator
                        </div>
                            <q-btn color="secondary" label="Add User" no-caps unelevated v-if="dtabel === 'DataUser'" class="btn-one" @click="adduser = true"/>
                    </div>
                    <div class="row">
                        <div class="d">
                            <q-btn :color="dtabel === 'DataUser' ? 'black' : 'primary'" label="Data User" no-caps flat :class="dtabel === 'DataUser' ? 'btnMenu' : ''" @click="dtabel = 'DataUser'"/>
                            <q-btn :color="dtabel === 'RequestData' ? 'black' : 'primary'" label="Request User" no-caps flat :class="dtabel === 'RequestData' ? 'btnMenu' : ''" @click="dtabel = 'RequestData'"/>
                        </div>
                        <q-space />
                        <component :is="dtabel" class="q-mt-lg"/>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</q-page>
<AddUser v-model:adduser="adduser" v-if="adduser"/>
</template>

<script>
import DataUser from 'components/User/DataUser.vue'
import RequestData from 'components/User/RequestData.vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { provide,ref, defineAsyncComponent } from 'vue'
import AddUser from 'components/User/AddUser.vue'
import { useStore } from 'vuex'
export default {
    setup(){
        const { filter, getData,resetFilter,onFilter,
            onResetFilter
         } = usePratesis()
        const store = useStore()
        const dataFilter = ref({})
        dataFilter.value.kode_pengguna = null
        dataFilter.value.kode_group = null
        const optkode_pengguna = ref([
            {
                label : 'Kode Pengguna',
                value : null
            }
        ])
        const datakode_pengguna = ref([])
        getData('area',store.state.auth.token)
        .then(res=>{
            res.data.data.forEach((item)=>{
                optkode_pengguna.value.push({
                    label :item.kode_area,
                    value :item.kode_area,
                })
            })
            datakode_pengguna.value = res.data.data
            console.log("data area",res.data.data)
        })
        .catch(err=>{
            console.log("error",err)
        })

        const optkode_group = ref([
            {
                label : 'Group Pengguna',
                value : null
            }
        ])
        getData('usergroup',store.state.auth.token)
        .then(res=>{
            res.data.data.forEach((item)=>{
                optkode_group.value.push({
                    label : item.nama_group,
                    value: item.kode_group
                })
            })
            console.log("data usergroup",res.data.data)
        })
        .catch(err=>{
            console.log("error",err)
        })

        function onReset(){
            onResetFilter()
            dataFilter.value.kode_pengguna = null
            dataFilter.value.kode_group = null
        }

        provide('filter',filter)
        return {
            filter,
            optkode_pengguna,
            optkode_group,
            getData,
            resetFilter,
            onFilter,
            onReset,
            dataFilter
        }
    },
    components:{
        DataUser,
        RequestData,
        AddUser,
        Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb')),
        
    },
    data(){
        return{
            kodeuser:'',
            status:'one',
            dtabel:'DataUser',
            adduser:false
        }
    },
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