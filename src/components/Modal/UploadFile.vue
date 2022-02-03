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
                    <q-file borderless v-model="filesupload" label="Borderless" accept=".xls" max-file-size="15000048"  @rejected="onRejected" for="inputfile" style="display:none;"/>
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
                        <div style="margin-top:30px;" class="text-h6">Your document has been uploaded </div>
                        <div class="text-grey" style="margin-top:14px;font-size:12px;">Your file is correct, Please proceed to the next step </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="center" style="margin-top:71px;margin-bottom:30px;" v-if="!result">
                <q-btn :label="uploading ? 'Cancel' : 'Upload'" no-caps color="secondary" class="btn-one" unelevated @click="onUpload" :outline="uploading ? true : false"/>
            </q-card-actions>
            <q-card-actions align="between" style="margin-top:71px;margin-bottom:30px;padding-left:20px;padding-right:20px;" v-if="result && !uploading">
                <q-btn label="Cancel" no-caps color="secondary" class="btn-one" unelevated @click="onUpload" outline/>
                <q-btn label="Submit" no-caps color="secondary" class="btn-one" unelevated @click="onUpload"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    setup(){
        const { errorNotif } = usePratesis()
        function onRejected(reject){
            if(reject[0].failedPropValidation === 'accept') {
                errorNotif('File harus berupa file berekstensi .xls')
            }
            else if (reject[0].failedPropValidation === 'max-file-size'){
                errorNotif('File maksimal berukuran 15MB')
            }
        }
        return {
            errorNotif,
            onRejected
        }
    },
    props: ['upload'],
    data(){
        return{
            uploading:false,
            result:false,
            waiting:'',
            filesupload:null
        }
    },
    methods:{
        onUpload(){
            if(this.uploading){
                clearTimeout(this.waiting);
                this.uploading = false
                this.result = false
            }else{
                this.uploading = true
                this.waiting = setTimeout(() => {
                    this.uploading = false
                    this.result = true
                }, 5000);
            }
            console.log("data",this.filesupload)
        },
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
        drop(event) {
        event.preventDefault();
        let dropfile = event.dataTransfer.files[0]
        let panjangkata = dropfile.name.length
        let ekstensi = dropfile.name.substr(panjangkata-3,panjangkata-1)
        if(ekstensi !== 'xls'){
            this.errorNotif('File harus berupa file berekstensi .xls')
        }else  if(dropfile.size >= 15000000 ){
            this.errorNotif('File maksimal berukuran 15MB')
        }else{
            this.filesupload = event.dataTransfer.files[0]
        }

        // Clean up
        event.currentTarget.classList.add('bg-primary4')
        event.currentTarget.classList.remove('bg-light-blue-2')
        },
        removeFile(){
            this.filesupload = null
        },
    }
}
</script>

<style>

</style>