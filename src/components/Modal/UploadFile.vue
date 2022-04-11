<template>
    <q-dialog :model-value="upload" @hide="$emit('update:upload',false)">
        <q-card style="width:460px;">
            <q-card-section class="row items-center" v-if="!result">
                <span class="text-h6 text-center col-12" v-text="uploading ? 'Uploading Your File' : 'Upload Your File'"></span>
            </q-card-section>
            <q-card-section class="q-pt-sm" style="padding-right:30px; padding-left:30px;" v-if="!uploading && !result">
                <div class="row bg-primary4 justify-center box-upload" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <label for="inputfile" class="col-12 text-center q-mt-lg input-upload">
                        <q-img
                            src="~assets/icon/uploadfile.svg"
                            spinner-color="primary"
                            spinner-size="50px"
                            width="102px"
                            height="68px"
                        />
                        <div style="margin-top:30px;">Drop your file or <span class="text-primary">Browse</span> </div>
                        <div class="text-grey" style="margin-top:14px;font-size:10px;">Only Microsoft Excel files with max size 15mb</div>
                        <q-chip removable @remove="removeFile" color="primary" text-color="white" icon="description" v-if="filesupload">
                            {{filesupload.name}}
                        </q-chip>
                    </label>
                    <!-- <input type="file" id="inputfile" @change="onFileSelected" ref="file"/> -->
                    <q-file borderless v-model="filesupload" label="Borderless" accept=".xlsx" max-file-size="15000048"  @rejected="onRejected" for="inputfile" style="display:none;"/>
                </div>
            </q-card-section>
            <q-card-section v-if="uploading && !result">
                <div class="row">
                    <div style="background:#E4F0FF;border-radius:14px; padding:9px 12px;width:42px;height:42px;" class="q-mr-md">
                        <q-img
                            src="~assets/icon/file-download.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="18px"
                            height="24px"
                        />
                    </div>
                    <div class="row justify-center items-center col-10">
                            <div style="font-size:10px;">Starting...</div>
                            <q-spinner-facebook class="text-primary"/>  
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="q-pt-sm" style="padding-right:30px; padding-left:30px;margin-top:80px;" v-if="result && !uploading">
                <div class="row justify-center items-center ">
                    <div class="col-12 text-center">
                        <q-img
                            src="~assets/icon/file-spreadsheet.svg"
                            spinner-color="primary"
                            spinner-size="50px"
                            width="100px"
                            height="100px"
                        />
                        <div v-if="error">
                            <div style="margin-top:30px;" class="text-h6">Your document failed to upload </div>
                            <div class="font-medium q-mb-md">Message : {{error.message}} </div>
                            <div class="row justify-center items-center" v-for="(n,key) in error.data" :key="key">
                                <q-icon name="close" class="text-secondary" size="md" />
                                <div class="text-grey" style="font-size:12px;" v-for="(err,index) in n" :key="index">
                                    {{err}}
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div style="margin-top:30px;" class="text-h6">Your document has been uploaded </div>
                            <div class="text-grey" style="margin-top:14px;font-size:12px;">Your file is correct, Please proceed to the next step </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;" v-if="!result">
                <q-btn :label="uploading ? 'Cancel' : 'Upload'" no-caps color="secondary" class="btn-one" unelevated @click="onUpload" :outline="uploading ? true : false"/>
            </q-card-actions>
            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;padding-left:20px;padding-right:20px;" v-if="result && !uploading && error">
                <q-btn label="Reupload File" no-caps color="secondary" class="btn-one" unelevated @click="reUpload"/>
            </q-card-actions>
            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;padding-left:20px;padding-right:20px;" v-if="result && !uploading && error === null">
                <q-btn label="Ok" no-caps color="secondary" class="btn-one" unelevated v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
// import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
import { ref } from 'vue'
export default {
    name:'upload-file',
    props: ['upload','menu'],
    setup(props, { emit }){
        const { postData } = useService()
        const { errorNotif } = useCustom()
        function onRejected(reject){
            if(reject[0].failedPropValidation === 'accept') {
                errorNotif('File harus berupa file berekstensi .xlsx')
            }
            else if (reject[0].failedPropValidation === 'max-file-size'){
                errorNotif('File maksimal berukuran 15MB')
            }
        }

        const uploading = ref(false)
        const result = ref(false)
        const waiting = ref(null)
        const filesupload = ref(null)
        const error = ref(null)

        function drop(event) {
            event.preventDefault();
            let dropfile = event.dataTransfer.files[0]
            let panjangkata = dropfile.name.length
            let ekstensi = dropfile.name.substr(panjangkata-4,panjangkata-1)
            if(ekstensi !== 'xlsx'){
                errorNotif('File harus berupa file berekstensi .xlsx')
            }else  if(dropfile.size >= 15000000 ){
                errorNotif('File maksimal berukuran 15MB')
            }else{
                filesupload.value = event.dataTransfer.files[0]
            }

            // Clean up
            event.currentTarget.classList.add('bg-primary4')
            event.currentTarget.classList.remove('bg-light-blue-2')
        }
        function removeFile(){
            filesupload.value = null
        }

        function onUpload(){
            if(uploading.value){ //when cancel uploading
                clearTimeout(waiting.value)
                uploading.value = false
                result.value = false
                filesupload.value = null
            }else{ //when uploding
                uploading.value = true
                let kirim = new FormData()
                kirim.append('file',filesupload.value)
                postData(`${props.menu}/upload`,kirim)
                .then((res)=>{
                    waiting.value = setTimeout(() => {
                        uploading.value = false
                        result.value = true
                        emit('onUploadSuccess',{
                            res: res.data,
                            pagination : {
                                page : 1
                            }
                        })
                    }, 100);
                    filesupload.value = null
                })
                .catch(err=>{
                    uploading.value = false
                    result.value = true
                    filesupload.value = null
                    console.log("error",err.response)
                    console.log("error",err.response.data.message)
                    error.value = {
                        message :err.response.data.message,
                        data: err.response.data.data
                    }
                })
            }
        }

        function reUpload(){
            uploading.value = false
            result.value = false
            error.value = null
        }
        return {
            errorNotif,
            onRejected,
            error,

            uploading,
            result,
            waiting,
            filesupload,
            drop,
            removeFile,
            onUpload,
            reUpload

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
