<template>
    <q-table
        class="my-sticky-header-table q-mt-md btn-radius col-12"
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="loading"
        :filter="filter"
        v-model:pagination="pagination"
        @request="onRequest"
        hide-pagination
        binary-state-sort
        @row-click="openDetail"
        :selection="canSelect ? 'multiple' : 'none'"
        :selected-rows-label="getSelectedString"
        v-model:selected="selected"
    >
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-type="props">
            <q-td key="type" :props="props">
                <q-badge outline :label="'.' +props.row.type.toUpperCase()" style="background:#FFF7E6;color: #FA8C16;" />
            </q-td>
        </template>
        <template v-slot:body-cell-title="props">
            <q-td key="title" :props="props">
                {{props.row.title.substring(0,props.row.title.length-5)}}
                <q-img
                    src="~assets/icon/FileText.png"
                    spinner-color="primary"
                    spinner-size="5px"
                    width="14px"
                    height="14px"
                />
            </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
            <q-td key="actions" :props="props">
                <q-btn round color="secondary" flat unelevated @click.stop="oneDelete(props.row.id)">
                    <q-img
                        src="~assets/icon/trash-alt.svg"
                        spinner-color="primary"
                        spinner-size="5px"
                        width="20px"
                        height="20px"
                    />
                </q-btn>
                <q-btn round color="secondary" icon="download_for_offline" flat unelevated @click.stop="oneDownload(props.row.id)" />
            </q-td>
        </template>
    </q-table>
    <div class="row justify-end q-mt-md col-12">
        <q-pagination
            v-model="pagination.page"
            color="black"
            active-color="secondary"
            active-text-color="secondary"
            :max="pagesNumber"
            size="md"
            direction-links
            outline
            class="table-pagination"
            @update:model-value="gotoPage"
            :max-pages="4"
            :boundary-numbers="false"
        />
    </div>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
import { watch,ref } from 'vue'
import { useQuasar } from 'quasar'
import { api,header } from 'boot/axios'
import { useStore } from 'vuex'
export default {
    name:'master-table',
    props:{
        url: {
            type:String,
        },
        canSelect:{
            type:Boolean,
            default:false
        },
        resultSelect:{
            type:Array
        },
        filter: {
            type: String,
        },
        datagroup:{
            type:Object
        },
    },
    setup(props,{emit}){
        const { pagination,rows,loading,pagesNumber } = usePratesis()
        const { getData,deleteData,postData } = useService()
        const { formatTgl,successNotif } = useCustom()
        const quasar = useQuasar()

        const columns = [
            { name: 'title',  align: 'left',label: 'Data Title', field: row => row.title.substring(0,row.title.length-5), },
            { name: 'type',  align: 'left',label: 'Type', field: 'type', },
            { name: 'uploader',  align: 'left',label: 'Uploader', field: 'uploader_name', },
            { name: 'date',  align: 'left',label: 'Uploaded Date', field: row => formatTgl(row.created_at) },
            { name: 'actions',  align: 'left',label: 'Actions', field: 'actions', },
        ]
        watch(()=>props.url,val=>{
            init(val)
        })
        init(props.url)
        function init(value){
            loading.value = true
            getData(value)
            .then(res=>{
                pagination.value.page = res.data.data.data_page.current_page
                pagination.value.rowsPerPage = res.data.data.data_page.per_page
                pagination.value.rowsNumber = res.data.data.data_page.total
                rows.value = res.data.data.data_page.data
                loading.value = false
                if(value.split("?")[0] === 'master-data'){
                    emit('update:datagroup',res.data.data.data_group)
                }
            })
        }
        function onRequest(request){
            loading.value = true
            let filter = ''
            let requestKey = request.filter
            if(requestKey){
                if(requestKey.searchKey){
                    filter += `&search=${requestKey.searchKey}`
                }
                if(requestKey.uploader){
                    filter += `&uploader=${requestKey.uploader}`
                }
                if(requestKey.type){
                    filter += `&type=${requestKey.type}`
                }
                if(requestKey.upload_date){
                    filter += `&date=${requestKey.upload_date}`
                }
            }

            let paginate = ''
            if(props.url.split("?")[1]){
                paginate += '&'
            }else{
                paginate += '?'
            }

            const { page,rowsPerPage } = request.pagination
            if (page) {
                paginate += `page=${page}`
            }
            if(rowsPerPage){
                paginate += `&limit=${rowsPerPage}`
            }
            getData(props.url+paginate+filter)
            .then(res=>{
                pagination.value.page = res.data.data.data_page.current_page
                pagination.value.rowsPerPage = res.data.data.data_page.per_page
                pagination.value.rowsNumber = res.data.data.data_page.total
                rows.value = res.data.data.data_page.data
                loading.value = false
            })
        }

        const gotoPage = page => {
            let request = {}
            request.pagination = {
                page : page
            }
            if(props.filter){
                request.filter = props.filter
            }
            if(!loading.value){
                onRequest(request)
            } 
        }
        

        const selected = ref([])
        function getSelectedString () {
            if(selected.value.length === 0){
                return ''
            }else {
                return `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${pagination.value.rowsNumber}`
            }
        }

        watch(()=>selected.value,val=>{
            emit('update:resultSelect',val)
        })
        watch(()=>props.resultSelect,val=>{
            selected.value = val
        })
        function oneDelete(value){
            let id = []
            id.push(value)
            quasar.dialog({
                title: 'Konfirmasi Hapus Data',
                message: 'Anda yakin ingin menghapus data ini?',
                cancel: true,
                persistent: false
            })
            .onOk(()=>{
                deleteData(`master-data/${value}`)
                .then(()=>{
                    onRequest({
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
        const store = useStore()
        let token = store.state.auth.token

        function oneDownload(value){
            let id = []
            id.push(value)
            let headers = header(token,true)
            headers.responseType = 'blob'
            api.post('master-data/download',{
                ids: id
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

        return {
            pagination,rows,loading,onRequest,pagesNumber,gotoPage,

            columns,

            selected,getSelectedString,
            oneDelete,oneDownload
        }
    },
    
}
</script>