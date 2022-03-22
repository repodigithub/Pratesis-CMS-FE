<template>
    <div class="row">
        <q-checkbox v-model="checklist" :label="'Indomie Goreng Original' + n"  dense :disable="!manual"/>
        <q-space />
        <div style="width:268px;">
            <label for="Budget">Budget Produk</label>
            <q-input v-model="budget" type="number"  id="Budget" filled dense :disable="checklist && manual ? false : true" >
                <template v-slot:prepend>
                    <div class="font-normal">Rp</div>
                </template>
            </q-input>
        </div>
    </div>
</template>

<script>
import { ref,watch } from 'vue'
export default {
    name:'item-produk',
    setup(props,{emit}){
        const checklist = ref(false)
        const budget = ref(0)
        const manual = ref(true)
        if(props.aturan === '1'){
                checklist.value = true
                manual.value = false
        }else{
            checklist.value = false
            manual.value = true
            budget.value = 0
        }
        watch(()=>props.aturan,val=>{
            if(val === '1'){
                checklist.value = true
                manual.value = false
                budget.value = props.nilaiRata
            }else{
                checklist.value = false
                manual.value = true
                budget.value = 0
            }
        })
        watch(()=>props.nilaiRata,nilai=>{
            if(props.aturan === '1'){
                budget.value = nilai
            }else{
                budget.value = 0
            }
        })
        watch(()=>checklist.value,val=>{
            if (!val) {
                emit('update:budgetProduk',parseInt(0))
                budget.value = 0
            }
        })
        watch(()=>budget.value,val=>{
            emit('update:budgetProduk',parseInt(val))
        })
        return {
            checklist,
            budget,
            manual
        }
    },
    props:{
        n:{
            type:Number
        },
        budgetProduk:{
            type:Number,
            default:0
        },
        aturan:{
            type:String
        },
        nilaiRata:{
            type:Number,
            default:0
        }
    }
}
</script>

<style>

</style>