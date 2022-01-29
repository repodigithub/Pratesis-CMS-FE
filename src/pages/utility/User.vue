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
                            <q-select v-model="kode" :options="optkode" dense outlined bg-color="primary" dropdown-icon="expand_more" class="option-one" />
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
                        <q-select v-model="role" :options="optrole" dense outlined dropdown-icon="expand_more" class="option-three "/>
                    </div>
                    
                    <div class=" q-ml-md">
                        <q-btn :color="reset ? 'negative' :'primary'" :label="reset ? 'Reset' : 'Apply'" no-caps unelevated class="btn-one" @click="onFilter"/>
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
import { provide,ref } from 'vue'
import AddUser from 'components/User/AddUser.vue'
import { defineAsyncComponent } from 'vue'
export default {
    setup(){
        const { filter } = usePratesis()
        const kode = ref(2)
        const role = ref(2)
        const reset = ref(false)
        function onFilter(){
            if(reset.value){
                filter.value = {}
                kode.value = 'Kode Pengguna'
                role.value = 'Head Office'
                reset.value = false
            }else{
                filter.value = {
                    kode_pengguna : kode.value,
                    kode_group : role.value
                }
                reset.value = true
            }
        }
        provide('filter',filter)
        return {
            filter,
            optkode:['Kode Pengguna',1,2,3],
            optrole:['Head Office',1,2,3,4],
            kode,
            role,
            onFilter,
            reset
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