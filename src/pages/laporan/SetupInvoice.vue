<template>
    <breadcrumb  :rightside="false" />
    <div class="row q-pa-lg">
        <div class="col-5">
            <q-card flat>
                <q-card-section class="q-py-sm">
                    <div class="row justify-between items-center">
                        <p class="t-grey fs-20">Note Invoice</p>
                    </div>
                    <div class="row q-my-sm" v-for="(note,index) in notes" :key="index">
                        <div class="col-12">
                            <p class="fs-12 t-grey q-mb-sm">Message {{index+1}} :</p>
                            <q-input v-model="note.msg" type="textarea" autogrow outlined placeholder="Note Invoice" :disable="role == 'GA' ? true : false" />
                        </div>
                    </div>
                    <div class="row q-mt-xl q-mb-md">
                        <div class="col-6">
                            <q-btn :color="role == 'GA' ? 'grey' : 'secondary' " :disable="role == 'GA' ? true : false" outline label="Cancel" no-caps class="btn-one" unelevated/>
                        </div>
                        <div class="col-6 text-right">
                            <q-btn :color="role == 'GA' ? 'grey' : 'secondary' " :disable="role == 'GA' ? true : false" label="Submit" no-caps class="btn-one" unelevated @click="onSetupNote"/>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
            <q-card flat class="col-11">
                <q-card-section class="q-py-sm">
                    <div class="row justify-between items-center">
                        <p class="fs-20">Setup Tanda Tangan</p>
                    </div>
                    <q-form
                        @submit="onSetupSign"
                        class="row"
                    >
                        
                        
                    <div class="row">
                        <div class="col-12 text-center">
                            <p class="q-mb-none fs-20">Upload Your File</p>
                        </div>
                        <div class="col-6 text-center">
                            <label for="imgdibuat" v-if="!prevdibuat">
                                <div class="row items-center justify-center box-uploadimage " style=" margin-top:20px;margin-left:20px;"
                                :class="role == 'GA' ? 'can-upload' : ''"
                                >
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
                                </label>
                                <label for="imgdibuat" v-else :class="role == 'GA' ? 'cursor-pointer' :''">
                                <img :src="prevdibuat"  style="width:180px;height:180px; margin-top:20px;margin-left:20px;">
                                </label>
                            <q-file borderless :model-value="imgdibuat" @update:model-value="updateDibuat" label="Borderless" @rejected="onRejected" for="imgdibuat" style="display:none;" accept="image/*" v-if="role == 'GA'"/>
                            <p class="q-mb-none fs-14 q-mt-md">Dibuat oleh</p>
                            <q-input v-model="created_by" type="text" outlined placeholder="ex : Joko" style="width:180px;" class="q-mx-auto" :disable="role == 'GA' ? false : true" lazy-rules  :rules="[val => !!val || 'Dibuat oleh tidak boleh kosong']"/>
                        </div>
                        <div class="col-6 text-center">
                            <label for="inputfile" v-if="!prevsetuju">
                            <div class="row items-center justify-center box-uploadimage " style=" margin-top:20px;margin-left:20px;"
                            :class="role == 'GA' ? 'can-upload' : ''"
                            >
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
                            </label>
                            <label for="inputfile" v-else :class="role == 'GA' ? 'cursor-pointer' :''">
                            <img :src="prevsetuju"  style="width:180px;height:180px; margin-top:20px;margin-left:20px;">
                            </label>
                            <q-file borderless :model-value="imgsetuju" @update:model-value="updateSetuju" label="Borderless" @rejected="onRejected" for="inputfile" style="display:none;" accept="image/*" v-if="role == 'GA'"/>
                            <p class="q-mb-none q-mt-md fs-14">Disetujui oleh</p>
                            <q-input v-model="approved_by" type="text" outlined placeholder="ex : Joko" style="width:180px;" class="q-mx-auto" :disable="role == 'GA' ? false : true" lazy-rules  :rules="[val => !!val || 'Disetujui oleh tidak boleh kosong']"/>
                        </div>
                        <div class="col-12 text-center q-my-lg">
                            <q-btn :color="role == 'GA' ? 'secondary' : 'grey' " :disable="role == 'GA' ? false : true" label="Submit" no-caps class="btn-one" unelevated type="submit"/>
                        </div>
                    </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent,ref,computed } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'

export default {
    setup(){
        const { role } = usePratesis()
        const { putData,getData,postData } = useService()
        const { showLoading,hideLoading,successNotif,errorNotif } = useCustom()
        const notes = ref([ {msg: ''},{msg: ''},{ msg: ''}])

        function onSetupNote(){
            let sendtoApi = {}
            showLoading()
            notes.value.forEach((val,index)=>{
                sendtoApi[`message_${index+1}`] = val.msg
            })
            putData('setting/note',sendtoApi)
            .then(()=>{
                hideLoading()
                successNotif('Note Invoice Berhasil Disimpan')
            })
        }
        getData('setting/note')
        .then(res=>{
            let result = Object.values(res.data.data)
            notes.value.forEach((val,index)=>{
                val.msg = result[index]
            })
        })

        const imgsetuju = ref(null)
        const prevsetuju = ref(null)
        function updateSetuju(value){
            imgsetuju.value = value
            prevsetuju.value = URL.createObjectURL(value)
        }

        const imgdibuat = ref(null)
        const prevdibuat = ref(null)
        function updateDibuat(value){
            imgdibuat.value = value
            prevdibuat.value = URL.createObjectURL(value)
        }

        function onRejected(reject){
            if(reject[0].failedPropValidation === 'accept') {
                errorNotif('File harus berupa file berekstensi .png, .jpg')
            }
            // else if (reject[0].failedPropValidation === 'max-file-size'){
            //     errorNotif('File maksimal berukuran 3MB')
            // }
        }
        const created_by = ref('')
        const approved_by = ref('')
        function onSetupSign(){
            let sendtoApi = new FormData()
            sendtoApi.append('_method','PUT')
            if (imgsetuju.value) {
                sendtoApi.append('approved_by_sign',imgsetuju.value)
            }
            if (imgdibuat.value) {
                sendtoApi.append('created_by_sign',imgdibuat.value)
            }
            sendtoApi.append('created_by_name',created_by.value)
            sendtoApi.append('approved_by_name',approved_by.value)
            showLoading()
            postData('setting/sign',sendtoApi)
            .then(()=>{
                hideLoading()
                successNotif('Setup Tanda Tangan Berhasil Disimpan')
            })
        }
       
        getData('setting/sign')
        .then(res=>{
            let result = res.data.data
            prevsetuju.value = result.approved_by.sign
            prevdibuat.value = result.created_by.sign
            approved_by.value = result.approved_by.name
            created_by.value = result.created_by.name
        })
        return {
            notes,role,onSetupNote,
            imgdibuat,updateDibuat,prevdibuat,created_by,
            imgsetuju,updateSetuju,prevsetuju,approved_by,
            onRejected,onSetupSign,
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
    },
}
</script>