<template>
    <q-input  id="Budget" type="text" outlined dense lazy-rules
        :rules="[
            val => val && val.length > 0 || 'Budget tidak boleh kosong',
        ]" placeholder="Budget"
        :model-value="budget"
        @update:model-value="budgetFormat"
        :bg-color="bgcolor" 
        :class="nameClass"
        :disable="disable"
        >
        <template v-slot:prepend>
            <div class="font-normal">Rp</div>
        </template>
    </q-input>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    props:['budget','bgcolor','nameClass','disable'],
    setup(props,{ emit }){
        const { formatRibuan } = usePratesis()
        function budgetFormat(value){
            let result = formatRibuan(value.replaceAll('.', ''))
            emit('update:budget',result) 
        }
        return {
            budgetFormat
        }
    }
}
</script>

<style>

</style>