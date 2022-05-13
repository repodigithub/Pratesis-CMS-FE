<template>
<breadcrumb  :rightside="false" :leftside="false">
     <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Master Data" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row q-pa-lg">
    <div class="col-12">
        <q-card class="own-card" flat>
            <q-card-section>
                <div class="row justify-between">
                    <div class="font-medium text-bold">Master Data</div>
                    <q-input
                        v-model="search"
                        type="search"
                        label="Search"
                        outlined
                        debounce="1000"
                        dense>
                        <template v-slot:append>
                            <q-icon name="search" color="grey" />
                        </template>
                    </q-input>
                </div>
                <div class="row q-mt-md q-mb-lg">
                    <div class="col-12 row justify-center q-mt-lg" v-if="!valid">
                        <div class="col-4">
                            <q-spinner-grid class="text-primary q-mr-sm"/>
                            <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                        </div>
                    </div>
                    <div class="col-12 row" v-else>
                        <div class="col-12" v-if="search">
                            <div class="row" v-if="validSearch">
                                <div class="col-12 row" v-if="Object.keys(datagroup).length > 0">
                                    <q-badge text-color="white" class="q-px-md badge-master q-mr-md q-mb-sm" :class="kategori == 'Semua' ? 'active' : 'nonactive'" @click="kategori = 'Semua'">
                                        <div style="margin-right:10px;">Semua</div>
                                        <q-badge text-color="white" :label="total" rounded style="background: rgba(255, 255, 255, 0.3);"/>
                                    </q-badge>
                                    <q-badge
                                        text-color="white"
                                        class="q-px-md badge-master q-mr-md q-mb-sm" 
                                        :class="kategori == key ? 'active' : 'nonactive'"
                                        @click="kategori = key" v-for="(value,key) in datagroup" :key="key" v-show="value > 0">
                                        <div style="margin-right:10px;">{{changeData(key)}}</div>
                                        <q-badge text-color="white" :label="value" rounded style="background: rgba(255, 255, 255, 0.3);"/>
                                    </q-badge>
                                </div>
                                <master-table v-model:url="url" v-model:datagroup="datagroup" />
                            </div>
                            <div class="row justify-center q-mt-lg" v-else>
                                <div class="col-4">
                            <q-spinner-grid class="text-primary q-mr-sm"/>
                            <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                        </div>
                            </div>
                            
                        </div>
                        <div class="col-12 row grey4 q-py-lg" v-else>
                            <div class="col-2 q-mx-md q-my-md text-center item-master-data " v-for="n in folder" :key="n"  @click="onClick(n)">
                                <q-img
                                    src="~assets/icon/file.svg"
                                    spinner-color="primary"
                                    spinner-size="50px"
                                    width="130px"
                                    height="88px"
                                />
                                <div class="text-primary" style="line-height:18px;">{{n}}</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </q-card-section>
        </q-card>
    </div>
</div>

</template>

<script>
import { defineAsyncComponent,ref,watch } from 'vue'
import { useService } from 'src/composeables/useService'
import { useRouter } from 'vue-router'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    setup(){
        const { getData } = useService()
        const { changeData } = usePratesis()
        const folder = ref([])
        const valid = ref(false)

        const router = useRouter()
        // const columns = [
        //     { name: 'title',  align: 'left',label: 'Data Title', field: 'title', },
        //     { name: 'type',  align: 'left',label: 'Type', field: 'type', },
        //     { name: 'uploader',  align: 'left',label: 'Uploader', field: 'uploader', },
        //     { name: 'date',  align: 'left',label: 'Uploaded Date', field: 'date', },
        //     { name: 'actions',  align: 'left',label: 'Actions', field: 'actions', },
        // ]
        // let rows = []
        // for (let index = 0; index <= 10; index++) {
        //     let data = { title:'Budget Data',type:'.XSLX',uploader:'John Doe',date:'20/06/22'}
        //     rows.push(data)
        // }
        

        function onClick(val){
            router.push({name:'Detail Master Data',params:{folder : changeData(val,false)}})
        }

        getData('master-data')
        .then(res=>{
            folder.value = res.data.data.type.map(name => changeData(name) )
            valid.value = true
        })

        // const resultSearch = computed(()=>{
        //     return folder.value.filter(folder=> folder.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
        // })
        const search = ref('')
        const validSearch = ref(false)
        const url = ref('')
        const datagroup = ref({})
        watch(()=>search.value,val=>{
            if(val){
                setTimeout(() => {
                    validSearch.value = true
                    url.value = `master-data?search=${val}`
                }, 1000);
            }
                validSearch.value = false
        })
        const total = ref(0)
        watch(()=>datagroup.value,val=>{
            if(Object.keys(val).length > 0){
                total.value = Object.values(val).reduce((prev,current)=> prev+current)
            }
        })
        const kategori = ref('Semua')
        watch(()=>kategori.value,val=>{
            onChange(val)
        })
        function onChange(kategori){
            url.value = 'master-data'
            if(kategori === 'Semua'){
                url.value +=`?`
            }else{
                url.value += `/${kategori}?`
            }
                url.value += `search=${search.value}`
        }
        

        return {
            folder,
            valid,

            search,
            validSearch,
            url,
            onChange,
            datagroup,
            kategori,
            total,


            // resultSearch,
            changeData,
            onClick,
            // columns,
            // rows
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'master-table' : defineAsyncComponent(()=> import('./MasterTable'))
    },
}
</script>

<style lang="scss" scoped>
.item-master-data:hover{
    cursor:pointer;
    background:$grey3;
}
.badge-master{
    padding-top:6px;
    padding-bottom:6px;
    border-radius:30px;
    &.active{
        background:$primary;
        &:hover{
            background:$primary2;
        }
    }
    &.nonactive{
        background:$grey2;
        &:hover{
            background:$grey3;
        }
    }
    &:hover{
        cursor:pointer;
    }
}
</style>