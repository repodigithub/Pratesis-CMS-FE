<template>
    <q-dialog :model-value="drequest" @click="$emit('update:drequest', $event.target.value)" @hide="$emit('update:drequest',false)" full-height position="right">
        <q-card style="width:400px">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Request Data Detail</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>Request Date</div>
                <q-space />
                <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>User ID</div>
                <q-space />
                <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>Requested By</div>
                <q-space />
                <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>Email</div>
                <q-space />
                <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>Username</div>
                <q-space />
                <q-btn icon-right="edit" label="20/05/2022" no-caps class="text-primary" flat dense />
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div>User Level</div>
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
            </q-card-section>
            <q-card-section class="row items-center">
                <div>Status</div>
                <q-space />
                <q-badge outline  label="Waiting for Approval" class="alert3 alert1 q-px-md q-py-sm" />
                <!-- <q-badge outline color="positive" label="Approved" class="success3 q-px-md q-py-sm" /> -->
                <q-badge outline color="secondary" label="Rejected" class="warning3 q-px-md q-py-sm" v-if="'Rejected' === 'rejected'"/>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props:['drequest']
}
</script>

<style>

</style>