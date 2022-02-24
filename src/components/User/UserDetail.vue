<template>
    <q-dialog :model-value="modalDetail" @click="$emit('update:modalDetail', $event.target.value)" @hide="$emit('update:modalDetail',false)" full-height position="right" class="dialog-detail">
        <q-card style="width:400px;height:100%;">
            <q-form
            @submit.prevent.stop="onSave" ref="form"
                style="width:400px;height:100%;">
            <div class="data-detail">
                <q-card-section class="row items-start q-pb-none">
                    <div class="text-h6">{{$route.name}} Detail</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-scroll-area class="fit" v-if="valid">
                    <q-card-section class="q-pb-none" >
                        <slot name="detail-content" :tampil="dataModal" :send="dataModal" :edit="edit" :namaarea="nama_area" 
                        :namadistributor="nama_distributor"
                        />
                    </q-card-section>
                </q-scroll-area>
                <q-card-section class="row justify-center" v-else>
                    <q-spinner-grid class="col-4 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center">Memuat Data</span>
                </q-card-section>
                <q-card-section class="row items-center " v-if="canEdit">
                    <q-btn color="primary" icon="edit" label="Edit" no-caps unelevated class="q-px-sm btn-one" outline v-if="!edit" @click="onEdit" />
                    <q-btn color="primary" icon="save" label="Simpan" no-caps unelevated class="q-px-sm btn-one" outline v-else type="submit"/>
                    <q-space />
                    <div class="d" v-if="isRequest">
                        <q-btn color="secondary" label="Reject" no-caps unelevated class="q-px-sm btn-one q-mr-sm" outline @click="onLoad(dataDetail.id,'reject')"/>
                        <q-btn color="secondary" label="Approve" no-caps unelevated class="q-px-sm btn-one" @click="onLoad(dataDetail.id,'approve')"/>
                    </div>
                </q-card-section>
            </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref,watch } from 'vue'
import {  useRoute } from 'vue-router'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
export default {
    name:'user-detail',
    props:{
        modalDetail: {
            type: Boolean,
        },
        dataDetail: {
            type: Object,
        },
        canEdit:{
            type:Boolean,
            default:true
        },
        options:{
            type:Object
        },
        islogin: {
            type: Boolean,
            default: true
        },
        isRequest:{
            type:Boolean,
            default: false
        }
    },
    setup(props, { emit }){
        const { putData,getData } = useService()
        const { showLoading,hideLoading,successNotif } = useCustom()

        const form = ref(null)
        const dataModal = ref({})
        const route = useRoute()

        const edit = ref(false)

        const valid = ref(false) // utk mengload data detail berdasarkan relasinya

        function onEdit(){
            edit.value = true
        }

        const url = ref(null)
        url.value = `${route.path.substr(1)}/${props.dataDetail.id}`

        if(props.options){
            let x = {...props.options}
            url.value += `?include=${x.include}`
        }

        getData(url.value)
        .then(res=>{
            dataModal.value = res.data.data
            valid.value = true
        })

        const nama_area = ref('undefined')
        watch(()=>dataModal.value.kode_area,val=>{
            console.log("val dari props",val)
            if(val !== null){
                getData(`area?search=${val}`)
                .then(res=>{
                    nama_area.value = res.data.data.data[0].nama_area
                })
            }
        })

        const nama_distributor = ref('undefined')
        watch(()=>dataModal.value.kode_distributor,val=>{
            console.log("val dari props",val)
            if(val !== null){
                getData(`distributor?search=${val}`)
                .then(res=>{
                    nama_distributor.value = res.data.data.data[0].nama_distributor
                })
            }
        })

        function onSave(){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    if(dataModal.value.kode_group.includes('SA')){
                        dataModal.value.kode_distributor = null
                    }else if(!dataModal.value.kode_group.includes('DI')){
                        dataModal.value.kode_distributor = null
                        dataModal.value.kode_area = null
                    }
                    showLoading()
                    putData(url.value.split("?")[0],dataModal.value)
                    .then(()=>{
                        hideLoading()
                        successNotif(`Data ${route.name} berhasil diperbarui`)
                        emit('update:modalDetail',false)
                        emit('reloadTable',{
                            pagination : {
                                page : 1
                            }
                        })
                    })
                    .catch(()=>{
                        hideLoading()
                    })
                }
            })
        }

        return {
            edit,
            dataModal,
            form,

            onEdit,
            onSave,
            successNotif,
            getData,putData,

            valid,
            nama_area,
            nama_distributor
        }
    },
    methods:{
        onLoad(index,action){
            this.$parent.onClick(index,action)
        },
    }
}
</script>

<style>

</style>