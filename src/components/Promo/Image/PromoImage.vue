<template>
    <div class="col-12 q-mb-md">
        <q-card class="own-card">
            <q-card-section class="q-pb-none" style="padding-left:20px;padding-right:20px;">
                <div class="text-h6">Image Promo</div>
            </q-card-section>
            <q-card-section v-if="loading">
                <div class="row justify-center q-mt-lg">
                    <q-spinner-grid class="col-3 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                </div>
            </q-card-section>
            <q-card-section v-else>
                <q-scroll-area style="height: 230px; max-width: 1000px;">
                <div class="row no-wrap" v-if="promoimage.length <= 0">
                    <div v-for="n in 6" :key="n" style="width: 200px" class="q-pa-sm" >
                        <div class="row items-center justify-center box-uploadimage" @click="upload = !upload">
                            <div class="row items-center justify-center border">
                                <q-img
                                    src="~assets/icon/image-polaroid.svg"
                                    spinner-color="primary"
                                    spinner-size="5px"
                                    width="24px"
                                    height="24px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row no-wrap" v-else>
                    <div v-for="index in 6" :key="index" style="width: 200px" class="q-pa-sm" >
                        <div class="d" v-if="promoimage[index-1]">
                            <q-img
                                :src="promoimage[index-1].link"
                                spinner-color="primary"
                                spinner-size="20px"
                                width="180px"
                                height="180px"
                            />
                        </div>
                        <div class="row items-center justify-center box-uploadimage" @click="upload = !upload" v-else>
                            <div class="row items-center justify-center border">
                                <q-img
                                    src="~assets/icon/image-polaroid.svg"
                                    spinner-color="primary"
                                    spinner-size="5px"
                                    width="24px"
                                    height="24px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </q-scroll-area>
            </q-card-section>
        </q-card>
    </div>
    <upload-image v-model:upload="upload" v-if="upload" @loadImage="initData"/>
</template>

<script>
import { defineAsyncComponent,ref,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { useRoute } from 'vue-router'
export default {
    name:'promo-image',
    components:{
        'upload-image' : defineAsyncComponent(()=>import('./UploadImage'))
    },
    setup(){
        const upload = ref(false)
        const { getData } = useService()
        const route = useRoute()
        const promoimage = ref([])
        const loading = ref(true)

        function initData(){
            loading.value = true
            getData(`promo/${route.params.id}/image`)
            .then(res=>{
                let result = res.data.data.data
                result.forEach(item=>{
                    promoimage.value.push({
                        link: item.link
                    })
                })
                loading.value = false
            })
        }
        onMounted(()=>{
            initData()
        })
        return {
            upload,promoimage,initData,loading
        }
    }
}
</script>

<style>

</style>