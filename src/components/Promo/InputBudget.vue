<template>
    <q-input  id="Budget" type="text" outlined dense lazy-rules
        :rules="[
            val => val && val.length > 0 || 'Budget tidak boleh kosong',
        ]" placeholder="Budget"
        v-model="inputbudget"
        :bg-color="status && ismanual ? '':'grey4'" 
        :class="status && ismanual ? '' : 'input-disable'"
        :disable="status && ismanual ? false : true"
        @keyup="budgetFormat"
        >
        <template v-slot:prepend>
            <div class="font-normal">Rp</div>
        </template>
    </q-input>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
import { ref,watch,onMounted } from 'vue'
export default {
    props:{
        budget:[String,Number],
        status:{
            type:Boolean,
            default:true
        },
        ismanual:{
            type:Boolean,
            default:true
        }
    },
    setup(props,{ emit }){
        const { formatRibuan } = usePratesis()
        const inputbudget = ref('')
        function budgetFormat(event){
            let result = ''
            if (/[0-9+]/.test(event.key)) {
                result = formatRibuan(event.target.value.replaceAll('.',''))
            }else{
                result = formatRibuan(event.target.value.replace(event.key,'').replaceAll('.',''))
            }
                inputbudget.value = result
        }

        watch(()=>inputbudget.value,val=>{
            emit('update:budget',val)
        })

        watch(()=>props.budget,val=>{
            inputbudget.value = val
        })

        onMounted(()=>{
            if (props.budget) {
                inputbudget.value = props.budget
            }
        })

        return {
            budgetFormat,inputbudget
        }
    }
}
</script>

<style>

</style>