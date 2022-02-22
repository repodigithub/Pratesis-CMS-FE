<template>
    <q-dialog :model-value="drequest" @click="$emit('update:drequest', $event.target.value)" @hide="$emit('update:drequest',false)" full-height position="right" class="dialog-detail">
        <q-card style="width:400px;height:100%;">
            <div class="request-detail">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Request Data Detail</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-scroll-area class="fit">
                    <q-card-section class="row items-center q-pb-none">
                        <div>Request Date</div>
                        <q-space />
                        <div >{{formatTgl(dataDetail.created_at)}}</div>
                    </q-card-section>
                    <q-card-section class=" q-pb-none">
                        <div class="row items-center" v-if="!edit">
                            <div>User ID</div>
                            <q-space />
                            <div >{{dataDetail.user_id}}</div>
                        </div>
                        <div v-else >
                            <label for="user_id">User ID</label>
                            <q-input v-model="send.user_id" type="text" id="user_id"  outlined />
                        </div>
                    </q-card-section>
                    <q-card-section class=" q-pb-none">
                        <div class="row items-center" v-if="!edit">
                            <div>Full Name</div>
                            <q-space />
                            <div >{{dataDetail.full_name}}</div>
                        </div>
                        <div v-else>
                            <label for="full_name">Full Name</label>
                            <q-input v-model="send.full_name" type="text" id="full_name" outlined />
                        </div>
                    </q-card-section>
                    <q-card-section class=" q-pb-none">
                        <div class="row items-center" v-if="!edit">
                            <div>Email</div>
                            <q-space />
                            <div >{{dataDetail.email}}</div>
                        </div>
                        <div v-else>
                            <label for="email">Email</label>
                            <q-input v-model="send.email" type="text" id="email" outlined />
                        </div>
                    </q-card-section>
                    <q-card-section class=" q-pb-none">
                        <div class="row items-center" v-if="!edit">
                            <div>Username</div>
                            <q-space />
                            <div >{{dataDetail.username}}</div>
                        </div>
                        <div v-else>
                            <label for="username">Username</label>
                            <q-input v-model="send.username" type="text" id="username" outlined />
                        </div>
                    </q-card-section>
                    <!-- <q-card-section class="row items-center q-pb-none">
                        <div>Kode Group</div>
                        <q-space />
                        <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
                    </q-card-section>
                    <q-card-section class="row items-center q-pb-none">
                        <div>Kode Depot</div>
                        <q-space />
                        <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
                    </q-card-section>
                    <q-card-section class="row items-center q-pb-none">
                        <div>Nama Depot</div>
                        <q-space />
                        <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
                    </q-card-section>
                    <q-card-section class="row items-center q-pb-none">
                        <div>Kode Distributor</div>
                        <q-space />
                        <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
                    </q-card-section>
                    <q-card-section class="row items-center q-pb-none">
                        <div>Nama Distributor</div>
                        <q-space />
                        <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
                    </q-card-section> -->
                    <q-card-section class="row items-center">
                        <div>Status</div>
                        <q-space />
                        <q-badge outline  label="Waiting for Approval" class="alert3 alert1 q-px-md q-py-sm btn-two" />
                    </q-card-section>
                </q-scroll-area>
                <q-card-section class="row items-center ">
                    <q-btn color="primary" icon="edit" label="Edit" no-caps unelevated class="q-px-sm btn-one" outline @click="onEdit" v-if="!edit"/>
                    <q-btn color="primary" icon="save" label="Simpan" no-caps unelevated class="q-px-sm btn-one" outline @click="onSave" v-else 
                    :disabled="disable" :loading="loading">
                        <template v-slot:loading>
                            <div class="row items-center">
                                <q-spinner-facebook />  
                            </div>
                        </template>
                    </q-btn>
                    <q-space />
                    <div class="d">
                        <q-btn color="secondary" label="Reject" no-caps unelevated class="q-px-sm btn-one q-mr-sm" outline @click="onLoad(dataDetail.id,'reject')"/>
                        <q-btn color="secondary" label="Approve" no-caps unelevated class="q-px-sm btn-one" @click="onLoad(dataDetail.id,'approve')"/>
                    </div>
                </q-card-section>
            </div>
            
        </q-card>
    </q-dialog>
</template>

<script>
import { ref,onMounted } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'
export default {
    props:['drequest','dataDetail'],
    setup(props,{emit}){
        const edit = ref(false)
        const send = ref({})
        const disable = ref(false)
        const loading = ref(false)
        const { formatTgl,showLoading,hideLoading } = useCustom()
        const { putData } = useService()
        function onEdit(){
            edit.value = true
        }
        function onSave(){
            showLoading()
            putData(`user/${send.value.id}`,send.value)
            .then(res=>{
                hideLoading()
                edit.value = false
                send.value = res.data.data
                emit('update:dataDetail',res.data.data)
                emit('reloadTable',{
                    pagination : {
                        page : 1
                    }
                })
            })
            .catch(()=>{
                hideLoading()
            })
        }
        onMounted(()=>{
            send.value = {...props.dataDetail}
        })
        return {
            edit,
            onEdit,
            onSave,
            formatTgl,
            send,
            disable,
            loading
        }
    },
    methods:{
        onLoad(index,action){
            this.$parent.onClick(index,action)
        },
    }

}
</script>

<style>
.request-detail{
    display: grid;
    grid-template-rows:50px auto 70px;
    height:100%;
}
.dialog-detail .q-dialog__inner--right{
    padding-top:0;
    padding-bottom:0;
}
</style>
