<template>
    <q-dialog :model-value="upload" @hide="$emit('update:upload',false)">
        <q-card style="width:460px;">
            <q-card-section class="row items-center">
                <span class="text-h6 text-center col-12" >
                    Unggah Image Promo
                </span>
            </q-card-section>
            <q-card-section class="q-pt-sm" style="padding-right:30px; padding-left:30px;" v-if="!uploading">
                <div class="row bg-primary4 justify-center items-center box-upload" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <label for="inputfile" class="col-12 text-center  input-upload">
                        <q-img
                            src="~assets/icon/uploadimage.svg"
                            spinner-color="primary"
                            spinner-size="50px"
                            width="102px"
                            height="68px"
                        />
                        <div style="margin-top:30px;">Drop your image or <span class="text-primary">Browse</span> </div>
                        <div class="text-grey" style="margin-top:14px;font-size:10px;">PNG or JPG less than 3 MB</div>
                    </label>
                    <q-file borderless v-model="filesupload" label="Borderless" @rejected="onRejected" for="inputfile" style="display:none;" multiple accept="image/*" max-file-size="3000048" />
                </div>
            </q-card-section>
            <q-card-section v-if="filesupload.length > 0 && !uploading">
                <q-chip removable @remove="removeFile(index)" color="primary" text-color="white" icon="description" v-for="(files,index) in filesupload" :key="files">
                    {{files.name}}
                </q-chip>
            </q-card-section>

            <q-card-section v-if="uploading">
                <div class="row q-mb-md" v-for="(file,index) in dataUpload" :key="index">
                    <div style="background:#E4F0FF;border-radius:14px; padding:9px 12px;width:42px;height:42px;" class="q-mr-md">
                        <q-img
                            src="~assets/icon/uploadimage.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="18px"
                            height="24px"
                        />
                    </div>
                    <div class="row justify-center items-center col-10" v-if="file.start">
                            <div style="font-size:10px;">Uploading...</div>
                    </div>
                    <div class="row justify-center items-center col-10" v-else-if="file.finish">
                            <div style="font-size:10px;">Finish</div>
                    </div>
                    <div class="row justify-center items-center col-10" v-else-if="file.error">
                            <div style="font-size:10px;" class="col-12">Error</div>
                            <div v-for="(item,index) in error" :key="index" style="font-size:10px;" class="col-12">
                                {{item}}
                            </div>
                    </div>
                    <div class="row justify-center items-center col-10" v-else>
                            <div style="font-size:10px;">Waiting..</div>
                            <q-spinner-facebook class="text-primary"/>  
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;" v-if="!result">
                <q-btn :label="uploading ? 'Cancel' : 'Upload'" no-caps color="secondary" class="btn-one" unelevated @click="onUpload" :outline="uploading ? true : false"/>
            </q-card-actions>
            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;padding-left:20px;padding-right:20px;" v-if="result">
                <q-btn label="Ok" no-caps color="secondary" class="btn-one" unelevated @click="uploadSuccess"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref,watch } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'
import { useRoute } from 'vue-router'
export default {
    name:'upload-image',
    props: ['upload'],
    setup(props,{emit}){
        const { errorNotif } = useCustom()
        const filesupload = ref([])
        const dataUpload = ref([])
        watch(()=>filesupload.value,val=>{
            val.forEach((item,index)=>{
                if (index == 0) {
                    dataUpload.value.push({
                        start: true,
                        file:item,
                        finish:false,
                        error:false
                    })
                }else{
                    dataUpload.value.push({
                        start: false,
                        file:item,
                        finish:false,
                        error:false
                    })
                }
            })
        })

        function onRejected(reject){
            if(reject[0].failedPropValidation === 'accept') {
                errorNotif('File harus berupa file berekstensi .png, .jpg')
            }
            else if (reject[0].failedPropValidation === 'max-file-size'){
                errorNotif('File maksimal berukuran 3MB')
            }
        }

        function removeFile(index){
            filesupload.value.splice(index,1)
        }

        function drop(event) {
            event.preventDefault();
            let dropfile = event.dataTransfer.files[0]
            let panjangkata = dropfile.name.length
            let ekstensi = dropfile.name.substr(panjangkata-4,panjangkata-1)
            if(['png','jpg','jpeg'].indexOf(ekstensi) < 0){
                errorNotif('File harus berupa file berekstensi .png/.jpg')
            }else  if(dropfile.size >= 3000000 ){
                errorNotif('File maksimal berukuran 3MB')
            }else{
                filesupload.value = event.dataTransfer.files[0]
            }

            // Clean up
            event.currentTarget.classList.add('bg-primary4')
            event.currentTarget.classList.remove('bg-light-blue-2')
        }

        const uploading = ref(false)
        const error = ref(null)
        const result = ref(false)
        const { postData } = useService()
        const route = useRoute()

        async function onUpload(){
            if (uploading.value) {
                uploading.value = false
            }else{
                uploading.value = true
                for (let index = 0; index < dataUpload.value.length; index++) {
                    await sendApi(index)
                }
                result.value = true
                
            }
        }

        // async function sendApi(index){
        //     return new Promise((resolve,reject)=>{
        //         setTimeout(() => {
        //             dataUpload.value[index].start = false
        //             dataUpload.value[index].finish = true
        //             if (index !== dataUpload.value.length-1) {
        //                 dataUpload.value[index + 1].start = true
        //             }
        //             resolve('OK')
        //         }, 2000);
        //     })
        // }

        async function sendApi(index){
            let kirim = new FormData()
            kirim.append('file',dataUpload.value[index].file)
            return postData(`promo/${route.params.id}/image`,kirim)
                    .then(()=>{
                        dataUpload.value[index].start = false
                        dataUpload.value[index].finish = true
                        if (index !== dataUpload.value.length-1) {
                            dataUpload.value[index + 1].start = true
                        }
                    })
                    .catch(err=>{
                        dataUpload.value[index].error = true
                        dataUpload.value[index].start = false
                        error.value = err.response.data.data.file
                    })
        }

        function uploadSuccess(){
            emit('update:upload',false)
            emit('loadImage')
        }
        return {
            filesupload,onRejected,removeFile,drop,onUpload,
            uploading,dataUpload,result,error,
            uploadSuccess
            
        }
    },
    methods:{
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-light-blue-2')) {
                event.currentTarget.classList.remove('bg-primary4');
                event.currentTarget.classList.add('bg-light-blue-2');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-primary4');
            event.currentTarget.classList.remove('bg-light-blue-2');
        },
    }
}
</script>

<style>

</style>