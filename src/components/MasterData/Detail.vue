<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Master Data" class="text-primary" :to="{name: 'Master Data'}" />
        <q-breadcrumbs-el :label="detailName" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row q-pa-lg">
    <div class="col-12 q-mb-lg">
        <q-card class="own-card" flat>
            <q-card-section>
                <div class="row items-end">
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">Pencarian :</div>
                        <q-input v-model="search" placeholder="ex: Budget Data 2018" dense outlined class="option-two col-9">
                            <template v-slot:append>
                                <q-icon
                                    name="search"
                                    class="grey2"
                                />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">Uploader :</div>
                        <q-input v-model="uploader_name" placeholder="ex: John Doe" dense outlined class="option-two col-9">
                            <template v-slot:append>
                                <q-icon
                                    name="search"
                                    class="grey2"
                                />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">Type :</div>
                        <q-select
                          v-model="type"
                          :options="options"
                          outlined
                          dense
                          class="option-three"
                          dropdown-icon="expand_more" />
                    </div>
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">Uploaded Date :</div>
                        <q-input
                          v-model="upload_date"
                          type="date"
                          dense
                          outlined
                            hide-bottom-space
                          class="option-two col-9">
                            <!-- <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="upload_date">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template> -->
                        </q-input>
                    </div>
                    <q-space />
                    <q-btn color="primary" label="Search" no-caps @click="onSearch" unelevated class="btn-one q-mr-sm" />
                    <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="onReset" v-if="reset"/>
                </div>
            </q-card-section>
        </q-card>
        
    </div>
    <div class="col-12">
        <q-card class="own-card" flat>
            <q-card-section>
                <div class="row justify-between">
                    <div class="font-medium text-bold">Daftar {{detailName}}</div>
                    <div class="row">
                        <q-btn color="secondary"  no-caps class="btn-one q-mr-sm" unelevated @click="onDelete" v-if="selected.length > 0">
                            <q-img
                                src="~assets/icon/trash-alt.svg"
                                spinner-color="primary"
                                spinner-size="5px"
                                width="20px"
                                height="20px"
                                style="filter: brightness(0) invert(1);"
                                class="q-mr-sm"
                            />
                            Hapus
                        </q-btn>
                        <q-btn color="secondary" icon="download_for_offline" label="Download" no-caps class="btn-one" unelevated @click="batchDownload" v-if="selected.length > 0"/>
                    </div>
                </div>
                <div class="row">
                    <master-table :url="`master-data/${$route.params.folder}`" canSelect v-model:resultSelect="selected" v-model:filter="filter" ref="mastertable"/>
                </div>
            </q-card-section>
        </q-card>
    </div>
</div>

</template>

<script>
import { defineAsyncComponent,computed,ref} from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {useRoute} from 'vue-router'
import {useQuasar} from 'quasar'
import {useService} from 'src/composeables/useService'
import { api,header } from 'boot/axios'
import { useStore } from 'vuex'
export default {
    setup(){
        const { changeData,filter } = usePratesis()
        const route = useRoute()
        const detailName = computed(()=>{
            return changeData(route.params.folder)
        })
        const selected = ref([])
        const mastertable = ref('')
        const quasar = useQuasar()
        const { successNotif } = useCustom()
        const { postData } = useService()
    function onDelete(){
        let ids = []
        if(Array.isArray(selected.value)){
            selected.value.forEach((item) => {
                ids.push(item.id)
            })
            quasar.dialog({
                title: 'Konfirmasi Hapus Data',
                message: 'Anda yakin ingin menghapus data ini?',
                cancel: true,
                persistent: false
            })
            .onOk(()=>{
                postData('master-data/delete',{
                    ids :ids
                    })
                .then(()=>{
                    selected.value = []
                    mastertable.value.onRequest({
                        pagination:{
                            page:1
                        }
                    })
                    successNotif('Data Berhasil Dihapus')
                })
                .catch(err=>{
                    console.log("err",err)
                })
            })
        }
    }
    const store = useStore()
    let token = store.state.auth.token
    function batchDownload(){
        let ids = []
        let headers = header(token,true)
        headers.responseType = 'blob'
        if(Array.isArray(selected.value)){
            selected.value.forEach((item) => {
                ids.push(item.id)
            })
            api.post('master-data/download',{
                ids: ids
            },headers)
            .then(res=>{
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const taga = document.createElement('a')
                taga.href = url
                taga.setAttribute('download','masterdata.zip')
                document.body.appendChild(taga)
                taga.click()
            })
            .catch(err=>{
                console.log("error",err)
            })
        }
        
    }

    const search = ref(null)
    const reset = ref(false)
    const uploader_name = ref(null)
    const options = [
        '.XLSX',
        '.PDF'
    ]
    const type = ref('.XLSX')
    const upload_date = ref('')

    function onSearch(){
        filter.value = {
            searchKey : search.value,
            uploader : uploader_name.value,
            type: type.value.toLowerCase().substring(1),
            upload_date : upload_date.value
        }
        reset.value = true
    }
    function onReset(){
        reset.value = false
        search.value = null
        filter.value = null
        uploader_name.value =null
        type.value = '.XLSX'
        upload_date.value = null
    }

        return {
            detailName,
            options,

            onDelete,
            selected,
            filter,

            search,
            uploader_name,
            type,
            upload_date,
            onSearch,
            onReset,
            reset,
            mastertable,
            batchDownload
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'master-table':defineAsyncComponent(()=> import('./MasterTable'))
    },
}
</script>

<style>

</style>