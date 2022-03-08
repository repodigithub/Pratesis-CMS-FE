<template>
    <q-dialog :model-value="daction" @click="$emit('update:daction', $event.target.value)" @hide="$emit('update:daction',false)" :persistent="actionpersistent">
        <q-card style="width:400px">
            <q-card-section class="row items-center">
                <div class="text-h6 col-12">{{ action }} data</div>
                <span class="text-15 col-12">Apakah Anda Yakin ingin {{ action }} data ini?</span>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup   :disabled="ddisabled"/>
                <q-btn flat label="Ok" color="primary" @click="onLoad" :loading="dload"
            :disabled="ddisabled" > 
                    <template v-slot:loading>
                        <div class="row justify-between">
                            <div class="col-8 text-13">Loading..</div>
                            <q-spinner-facebook class="col-3"/>  
                        </div>
                    </template>
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props:['daction','action','dload',
        'ddisabled','actionpersistent'],
    methods:{
        onLoad(){
            this.$parent.onApproval()
        }
    }
}
</script>

<style>

</style>