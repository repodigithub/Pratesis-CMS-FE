<template>
    <q-card :class="classStyle" flat>
        <q-card-section>
            <slot name="toptable" />
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
                @row-click="onDetail"
                :selection="canSelect ? 'multiple' : 'none'"
                :selected-rows-label="getSelectedString"
                v-model:selected="selected"
            >
                <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                </template>
                <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
                    <slot :name="slot" v-bind="props" />
                </template>
            </q-table>
            <div class="row justify-end q-mt-md" v-if="rows.length > 0 && showPaginate">
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
        </q-card-section>
    </q-card>
    <detail-table v-model:modalDetail="modalDetail" v-if="modalDetail && canOpenDetail" :dataDetail="dataDetail" @reloadTable="onRequest" :canEdit="canEdit" :options="optionsDetail" >
        <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
            <slot :name="slot" v-bind="props" />
        </template>
    </detail-table>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
import { watch,defineAsyncComponent,ref } from 'vue'
export default {
    name:'core-table',
    props: {
        url: {
            type: String,
        },
        option: {
            type: String,
        },
        columns: {
            type: Array,
        },
        filter: {
            type: String,
        },
        requesting: {
            type: Object,
        },
        islogin: {
            type: Boolean,
            default: true
        },
        canEdit:{
            type:Boolean,
            default: true
        },
        optionsDetail:{
            type:Object
        },
        canOpenDetail:{
            type:Boolean,
            default:true
        },
        canSelect:{
            type:Boolean,
            default:false
        },
        resultSelect:{
            type:Array
        },
        classStyle: {
            type: String,
            default: "own-card"
        },
        showPaginate:{
            type:Boolean,
            default: true
        },
        customDetail:{
            type:Boolean,
            default:false
        }
    },
    setup(props, { emit }){
        const { pagination,rows,loading,init,onRequest,pagesNumber,modalDetail,openDetail,dataDetail } = usePratesis()

        init(props.url,props.option,props.islogin)

        function gotoPage(page){
            let request = {}
            request.pagination = {
                page : page
            }
            if(props.filter){
                request.filter = props.filter
            }
            onRequest(request)
        }        

        watch(()=> props.requesting, val =>{
            onRequest(val)
        })
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

        function onDetail(evt,row){
            if (props.customDetail) {
                emit('openCustomDetail',row)
            }else{
                openDetail(evt,row)
            }
        }
        
        return {
            rows,
            pagination,
            loading,
            onRequest,
            gotoPage,
            pagesNumber,

            modalDetail,//data detail table
            openDetail,
            dataDetail,
            selected,getSelectedString,
            onDetail
        }
    },
    components:{
        'detail-table': defineAsyncComponent(() => import('./Modal/DetailTable')),
    }
}
</script>

<style>

</style>