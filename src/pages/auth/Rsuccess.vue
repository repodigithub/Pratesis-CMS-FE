<template>
    <q-dialog :model-value="rsuccess" persistent @click="$emit('update:rsuccess', $event.target.value)">
        <q-card style="width:460px;height:460px;">
            <q-card-section class="row items-center justify-center text-center">
                <div class="col-12 text-center" style="margin-bottom:56px; margin-top:80px;">
                    <q-avatar size="100px" font-size="80px" color="primary" text-color="white" icon="done" />
                </div>
                <div class="blackown col-12 text-bold q-mb-md" style="font-size:20px;">Proses Pendaftaran Telah Diterima</div>
                <span class="q-ml-sm col-8 grey1" style="margin-bottom:30px;">Pendaftaran Anda sedang diproses,mohon untuk menunggu konfirmasi dari approver</span>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn  label="Ok" color="secondary" @click="$router.push('/login')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props:['rsuccess']
}
</script>

<style>

</style>