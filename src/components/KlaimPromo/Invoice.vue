<template>
<q-card-section class="row justify-center q-mt-xl" v-if="!load" style="height:100%;">
                <q-spinner-grid class="col-4 text-primary"/>
                <span class="col-12 text-primary font-medium text-center">Memuat Data</span>
</q-card-section>
<q-card-section class="q-px-lg" v-else>
    <div class="row items-start q-pb-none q-px-none" >
        <div class="text-h6">Invoice (Tanpa Materai)</div>
            <q-space />
        <img src="~assets/icon/arrow_blue.svg" alt="" width="17" style="margin-top:8px;" class="pointer" @click="$emit('update:isInvoice',false)">
    </div>
    <div class="row" id="printInvoice">
        <div class="col-12">
            
            <div class="row q-mt-md" style="background: #2684FF; height: 14px;"></div>
            <div class="row q-my-md">
                <div class="col-8 fs-14">
                <p class="q-mb-none">{{details.nama_distributor}}</p>
                <p style="color: #8195AF;" class="fs-12 q-mb-none">Kode Distributor : {{details.nama_distributor}}</p>
                <p style="color: #8195AF;" class="fs-12 q-mb-none"><img src="~assets/icon/calendar.svg" alt="" class="align-middle q-mr-sm"><span class="align-middle">{{GeneralFormatDate(details.created_at,'DD MMM YYYY')}}</span></p>
                </div>
                <div class="col-4 text-right">
                    <p style="color: #8195AF;" class="fs-10 q-mb-none">Nomor Invoice</p>
                    <p class="fs-14">{{details.kode_uli}}</p>
                </div>
            </div>
            <div class="row q-px-sm" style="background: #F7FAFE; height: 44px;align-items: center;">
                <div class="col-6">
                    Nama Promo
                </div>
                <div class="col-6 text-right">
                    Klaim (Rp)
                </div>
            </div>
            <div class="row q-px-sm">
                <div class="col-9 fs-12">
                    <p class="q-mb-none" style="font-weight:500;font-size:13px;">{{details.nama_promo}}</p>
                    <p class="q-mb-none">OPSO ID {{details.opso_id}}</p>
                    <p><img src="~assets/icon/calendar_blue.svg" alt="" class="align-middle q-mr-sm"> <span class="align-middle">{{GeneralFormatDate(details.start_date,'DD MMMM YYYY')}} - {{GeneralFormatDate(details.end_date,'DD MMMM YYYY')}}</span></p>
                </div>
                <div class="col-3 fs-12 text-right" style="margin: auto;">
                    Rp {{formatRibuan(details.amount)}}
                </div>
            </div>
            <div class="row q-px-sm">
                <div class="col-5">
                </div>
                <div class="col-7 fs-12">
                    <div class="row q-my-sm">
                        <div class="col-4">
                            Subtotal
                        </div>
                        <div class="col-8 text-right">
                            Rp {{formatRibuan(details.amount)}}
                        </div>
                    </div>
                    <div class="row q-my-sm">
                        <div class="col-4">
                            PPN
                        </div>
                        <div class="col-8 text-right">
                            Rp {{formatRibuan(details.ppn_amount)}}
                        </div>
                    </div>
                    <div class="row q-my-sm">
                        <div class="col-4">
                            PPH
                        </div>
                        <div class="col-8 text-right">
                            Rp {{formatRibuan(details.pph_amount)}}
                        </div>
                    </div>
                    <div class="row q-my-sm">
                        <div class="col-4">
                            Total
                        </div>
                        <div class="col-8 text-right">
                            Rp {{formatRibuan(details.total_amount)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <p class="q-mb-none col-12">Note :</p>
                <ol  class="q-pl-md q-mt-none fs-12 col-12">
                    <li v-for="(note,key) in notes" :key="key">{{note}}</li> 
                </ol>
            </div>
            <div class="row" style="margin-top:62px;">
                <div class="col-6 text-center">
                    <p class="q-mb-none">Dibuat oleh</p>
                    <img :src="created_by.sign" alt="" width="100" height="100">
                    <p>{{created_by.name}}</p>
                </div>
                <div class="col-6 text-center">
                    <p class="q-mb-none">Menyetujui</p>
                    <img :src="approved_by.sign" alt="" width="100" height="100">
                    <p>{{approved_by.name}}</p>
                </div>
            </div> 
        </div>
    </div>
    <div class="row">
        <div class="col-12 text-center">
            <q-btn color="secondary"  no-caps unelevated @click="printInvoice" label="Print"/>
        </div>
    </div>
</q-card-section>
</template>

<script>
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { ref } from 'vue'
export default {
    props:['isInvoice','details'],
    setup(){
        const { GeneralFormatDate } = useCustom()
        const { formatRibuan } = usePratesis()
        const { getData } = useService()
        const load = ref(false)
        const notes = ref('')
        const created_by = ref({})
        const approved_by = ref({})
        getData('setting/invoice-note')
        .then(res=>{
            console.log('invoice',res)
            let result = res.data.data
            notes.value = result.note
            created_by.value = result.sign.created_by
            approved_by.value = result.sign.approved_by
            load.value = true
        })
        function printInvoice() {
            // Get HTML to print from element
            const prtHtml = document.getElementById('printInvoice').innerHTML;
            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML;
            }
            // Open the print window
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
        }
        return {
            GeneralFormatDate,formatRibuan,load,notes,created_by,approved_by,printInvoice
        }
    }
}
</script>

<style>

</style>