<template>
  <q-dialog :model-value="adduser" @click="$emit('update:adduser', $event.target.value)" @hide="$emit('update:adduser',false)">
        <q-card style="width:400px;">
            <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Add User</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="user_id">User ID</label>
                <q-input v-model="send.user_id" type="text" id="user_id"  outlined />
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="full_name">Full Name</label>
                <q-input v-model="send.full_name" type="text" id="full_name"  outlined />
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="email">Email</label>
                <q-input v-model="send.email" type="text" id="email"  outlined />
            </q-card-section>
            <q-card-section class=" q-pb-none">
                <label for="username">Username</label>
                <q-input v-model="send.username" type="text" id="username"  outlined />
            </q-card-section>
            <q-card-actions align="between">
                <q-btn color="secondary" label="Batal"  no-caps unelevated outline v-close-popup class="btn-one"/>
                <q-btn color="secondary" label="Submit" no-caps unelevated class="btn-one"/>
            </q-card-actions>
            
            
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props:['adduser'],
    data(){
        return{
            send:{}
        }
    }
}
</script>

<style>

</style>