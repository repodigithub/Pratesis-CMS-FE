<template>
    <q-card-section>
        <div style="float:left;" class="q-mr-md">
            <div class="font-normal q-mb-sm">Spend Type :</div>
            <q-btn-group outline>
                <q-btn :outline="spend_type === 'All' ? false : true " no-caps color="primary" label="All" unelevated @click="filterSpend('All')" :class="spend_type === 'All' ? '' : 'bg-primary4'"/>
                <q-btn :outline="spend_type === 'RA' ? false : true " color="primary" label="RA" unelevated @click="filterSpend('RA')" :class="spend_type === 'RA' ? '' : 'bg-primary4'"/>
                <q-btn :outline="spend_type === 'FO' ? false : true " color="primary" label="FO" unelevated @click="filterSpend('FO')" :class="spend_type === 'FO' ? '' : 'bg-primary4'"/>
                <q-btn :outline="spend_type === 'OA' ? false : true " color="primary" label="OA" unelevated @click="filterSpend('OA')" :class="spend_type === 'OA' ? '' : 'bg-primary4'"/>
                <q-btn :outline="spend_type === 'PA' ? false : true " color="primary" label="PA" unelevated @click="filterSpend('PA')" :class="spend_type === 'PA' ? '' : 'bg-primary4'"/>
            </q-btn-group>
        </div>
        <div class="font-normal q-mb-sm">Status :</div>
        <q-btn-group outline>
            <q-btn :outline="status === 'All' ? false : true " color="primary" label="All" unelevated @click="filterStatus('All')" :class="status === 'All' ? '' : 'bg-primary4'" no-caps/>
            <q-btn :outline="status === 'Approve' ? false : true " color="primary" label="Approve" unelevated @click="filterStatus('Approve')" :class="status === 'Approve' ? '' : 'bg-primary4'" no-caps/>
            <q-btn :outline="status === 'Need Approval' ? false : true " color="primary" label="Need Approval" unelevated @click="filterStatus('Need Approval')" :class="status === 'Need Approval' ? '' : 'bg-primary4'" no-caps/>
            <q-btn :outline="status === 'Reject' ? false : true " color="primary" label="Reject" unelevated @click="filterStatus('Reject')" :class="status === 'Reject' ? '' : 'bg-primary4'" no-caps/>
            <q-btn :outline="status === 'Draft' ? false : true " color="primary" label="Draft" unelevated @click="filterStatus('Draft')" :class="status === 'Draft' ? '' : 'bg-primary4'" no-caps v-if="role !== 'GA' && !isApprove"/>
            <q-btn :outline="status === 'New Promo' ? false : true " color="primary" label="New Promo" unelevated @click="filterStatus('New Promo')" :class="status === 'New Promo' ? '' : 'bg-primary4'" no-caps v-if="role === 'GA' && !isApprove"/>
        </q-btn-group>
    </q-card-section>
</template>

<script>
import { ref } from 'vue'
export default {
    name:'filter-status',
    props:{
        role:{
            type:String
        },
        isApprove:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
    },
    setup(props,{emit}){
        const spend_type = ref('All')
        const status = ref('All')

        const filterStatus = statusPromo => {
            status.value = statusPromo
            emit('onStatus',status.value)
        }

        const filterSpend = spendtype => {
            spend_type.value = spendtype
            emit('onSpend',spend_type.value)
        }

        return {
            spend_type,status,filterStatus,filterSpend
        }
    },
}
</script>

<style>

</style>