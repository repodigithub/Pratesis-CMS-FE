<template>
<q-page >
    <breadcrumb  :rightside="false"/>
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card q-mb-lg" flat v-if="dtabel === 'DataUser'">
                <q-card-section class="row items-end q-px-md">
                    <div >
                        <div class="font-normal">Pencarian :</div>
                        <div class="row">
                            <q-select v-model="kode_pengguna" emit-value  map-options :options="optkode_pengguna" dense outlined bg-color="primary" dropdown-icon="expand_more" class="option-one" />
                            <q-input v-model="searchKey" placeholder="" dense outlined class="option-two">
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
                        <select-dropdown url="user-group" v-model:selected="kode_group" :islogin="false" :master="false" nameLabel="Group Pengguna :"/>
                    </div>
                    
                    <div class=" q-ml-md">
                        <q-btn color="primary" label="Apply" no-caps unelevated class="btn-one q-mr-md" @click="onSearching" />
                        <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="onReset" v-if="reset"/>
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
export default {
    setup(){
        const { filter,onFilter,
            onResetFilter
        } = usePratesis()

        const dataFilter = ref({})
        const kode_pengguna = ref('kode_pengguna')
        const kode_group = ref(null)
        const optkode_pengguna = ref([
            { 
                label : 'Kode Pengguna',
                value : 'kode_pengguna'
            },
            {
                label : 'Email',
                value:'email'
            },
            {
                label : 'Nama',
                value:'nama'
            }
        ])
        const searchKey = ref('')
        const reset = ref(false)

        function onSearching(){
            dataFilter.value = {}
            dataFilter.value[kode_pengguna.value] = searchKey.value
            dataFilter.value['kode_group'] = kode_group.value
            onFilter(dataFilter.value)
            reset.value = true
        }

        function onReset(){
            onResetFilter()
            dataFilter.value = {
                kode_group : null
            }
            kode_pengguna.value = 'kode_pengguna'
            searchKey.value = ''
            reset.value = false
        }

        provide('filter',filter)

        return {
            filter,
            optkode_pengguna,

            onFilter,
            onReset,
            dataFilter,
            onSearching,
            reset,

            kode_pengguna,kode_group,
            searchKey
        }
    },
    components:{
        DataUser,
        RequestData,
        AddUser,
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
        
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