<template>
  <q-dialog :model-value="adduser" @click="$emit('update:adduser', $event.target.value)" @hide="$emit('update:adduser',false)">
        <q-card style="width:400px;">
            <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Add User</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
        <q-form
        @submit.prevent.stop="onSave" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <q-card-section class=" q-pb-none">
                <div class="row justify-between">
                    <div class="col-3">
                        <label for="user_id" class="font-normal">User ID</label>
                        <q-input v-model="send.user_id" type="text" id="user_id"  outlined dense placeholder="User ID"/>
                    </div>
                    <div class="col-8">
                        <label for="full_name" class="font-normal">Full Name</label>
                        <q-input v-model="send.full_name" type="text" id="full_name"  outlined dense placeholder="Full Name"/>
                    </div>
                </div>
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="email" class="font-normal">Email</label>
                <q-input v-model="send.email" type="text" id="email"  outlined dense placeholder="Email"/>
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="username" class="font-normal">Username</label>
                <q-input v-model="send.username" type="text" id="username"  outlined dense placeholder="Username"/>
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="password" class="font-normal">Password</label>
                <q-input v-model="send.password" :type="visibility ? 'password' : 'text'" id="password"  outlined dense placeholder="Password">
                        <template v-slot:append>
                        <q-icon
                            :name="visibility ? 'visibility' : 'visibility_off'"
                            @click="visibility = !visibility"
                            class="cursor-pointer"
                        />
                        </template>
                    </q-input>
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <div class="row">
                    <select-dropdown url="user-group" v-model:selected="send.kode_group" :islogin="false" :master="false" class="q-mb-md col-12" nameLabel="User Level"/>
                    <div class="row col-12 justify-between" v-show="send.kode_group.includes('DI') || send.kode_group.includes('GA')">
                    <div class="col-6">
                        <select-dropdown url="area" v-model:selected="send.kode_area" :islogin="false" :master="false" class="q-mb-md" ref="kodedepo" nameLabel="Kode Depo"/>
                    </div>
                    <div class="col-5">
                        <label for="nama_depo" class="font-normal">Nama Depo</label>
                        <q-input v-model="nama_area"  dense outlined id="nama_depo" class="q-mb-md"
                        hide-bottom-space
                        disable
                        >
                        <template v-slot:append>
                            <q-icon
                                name="person"
                            />
                            </template>
                        </q-input>
                    </div>
                    </div>
                    <div class="row col-12 justify-between" v-if="showdistributor">
                        <div class="col-6">
                            <select-dropdown :url="urldistributor" v-model:selected="send.kode_distributor" :islogin="false" :master="false" class="q-mb-md" ref="kodedistributor" nameLabel="Kode Distributor"/> 
                        </div>
                        <div class="col-5">
                            <label for="nama_distributor" class="font-normal">Nama Distributor</label>
                            <q-input v-model="nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
                            hide-bottom-space
                            disable
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="between">
                <q-btn color="secondary" label="Batal"  no-caps unelevated outline v-close-popup class="btn-one"/>
                <q-btn color="secondary" label="Submit" no-caps unelevated class="btn-one" type="submit"/>
            </q-card-actions>
        </q-form>
            
        </q-card>
    </q-dialog>
</template>

<script>
import { defineAsyncComponent,watch,ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'
export default {
    components:{
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
    },
    props:['adduser'],
    setup(props,{emit}){
        const send = ref({})
        const kodedepo = ref('')
        const nama_area = ref('')
        const visibility = ref(true)

        const kodedistributor = ref('')
        const nama_distributor = ref('')

        const form = ref()
        const { showLoading,hideLoading,successNotif } = useCustom()
        const { postData } = useService()

        send.value = {
                user_id:'',
                full_name:'',
                username:'',
                email:'',
                password:'',
                kode_distributor:null,
                kode_area:null,
                kode_group:''
        }
        const urldistributor = ref('')
        const showdistributor = ref(false)
        watch(()=>send.value.kode_area,val=>{
            let a = kodedepo.value.options.filter(f=>f.value === val)
            nama_area.value = a[0].label
            showdistributor.value = false
            setTimeout(() => {
                urldistributor.value = `distributor?kode_area=${val}&status_distributor=aktif`
                showdistributor.value = true
            }, 100);
        })

        watch(()=>send.value.kode_distributor,val=>{
            let b = kodedistributor.value.options.filter(f=>f.value === val)
            nama_distributor.value = b[0].label
        })
        function onSave(){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    showLoading()
                    postData('user',send.value)
                    .then(()=>{
                        hideLoading()
                        emit('update:adduser',false)
                        successNotif('User berhasil Ditambahkan')
                    })
                    .catch(()=>{
                        hideLoading()
                    })
                }
            })
        }
        return {
            send,
            kodedepo,
            nama_area,
            kodedistributor,
            nama_distributor,
            form,
            onSave,
            successNotif,
            visibility,urldistributor,showdistributor
        }
    },
}
</script>

<style>

</style>