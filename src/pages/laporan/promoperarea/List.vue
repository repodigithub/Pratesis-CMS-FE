<template>
	<q-page>
		<breadcrumb  :rightside="false"/>
		<div class="row q-pa-lg">
			<div class="col-12">
				<q-card class="own-card q-mb-lg" flat>
				<q-card-section>
					<div class="row items-end q-gutter-xs">
						<div>
							<label for="statusDrop">Promo ID:</label>
							<div class="row q-gutter-xs">
								<q-select
									v-model="status_claim"
									:options="options"
									outlined
									dense
									class="option-three"
									id="statusDrop"
									emit-value
									map-options
									label="Dari promo ID" stack-label
									dropdown-icon="expand_more" />
								<q-select
									v-model="status_claim"
									:options="options"
									outlined
									dense
									class="option-three"
									id="statusDrop"
									emit-value
									map-options
									label="Sampai promo ID" stack-label
									dropdown-icon="expand_more" />
							</div>
						</div>
						<div>
								<label for="TglKlaim">Tanggal Klaim :</label>
								<div class="row q-gutter-xs">
									<q-input
								v-model="filter.start_date"
								type="date"
								dense
								outlined
								class="option-two"
								label="Dari tanggal" stack-label
								/>
									<q-input
								v-model="filter.start_date"
								type="date"
								dense
								outlined
								hide-bottom-space
								label="Sampai tanggal" stack-label
								class="option-two" />
								</div>
						</div>
						<div v-if="role === 'GA'">
							<label for="statusDrop">Distributor :</label>
								<q-select
									v-model="status_claim"
									:options="options"
									outlined
									dense
									class="option-three"
									id="statusDrop"
									emit-value
									map-options
									label="Dari promo ID" stack-label
									dropdown-icon="expand_more" />
						</div>
						<div>
							<label for="statusDrop">Status Klaim :</label>
								<q-select
									v-model="status_claim"
									:options="options"
									outlined
									dense
									class="option-three"
									id="statusDrop"
									emit-value
									map-options
									label="Dari promo ID" stack-label
									dropdown-icon="expand_more" />
						</div>
						<div class="text-right">
							<q-btn color="primary"  no-caps class="btn-one q-mr-md" unelevated @click="onFilter" >
								Search
							</q-btn>
						</div>
					</div>
				</q-card-section>
				</q-card>
			</div>
			<div class="col-12">
				<core-table
					:columns="columns"
					url="promo"
					customDetail @openCustomDetail="openDetail"
					ref="Coretable"
					:requesting="requesting"
					v-model:filter="filter"
					>
					<template v-slot:toptable>
						<div class="row justify-end">
							<q-btn color="secondary"  no-caps class="btn-one" unelevated label="Export to Excel" />
						</div>
					</template>
					<template v-slot:body-cell-status="props">
						<q-td key="status" :props="props">
							<q-badge outline :label="statusPromo(props.row.status)"  :class="active ? colorStatusPromo(props.row.status) : ''"
				style="padding-top:5px;padding-bottom:5px;" />
						</q-td>
					</template>
					
				</core-table>
			</div>
		</div>
	</q-page>
</template>

<script>
import { defineAsyncComponent,ref} from 'vue'
// import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'

export default {
	components:{
		'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
		'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
	},
	setup(){
		const { formatRibuan,role,modalUpload,openUpload } = usePratesis()
		const { GeneralFormatDate,colorStatusPromo,statusPromo,showLoading,hideLoading,successNotif,errorNotif } = useCustom()

		const columns = [
			{ name: 'kode', label: 'Promotion ID', align: 'left', field: 'opso_id' },
			{ name: 'nama_promo',  align: 'left',label: 'Nama Promo', field: 'nama_promo'},
			{ name: 'status', label: 'Status ', align: 'left', field:'status' },
		]

		const active = ref(true)
		const Coretable = ref(null)
		const requesting = ref(null)
		const kode_distributor = ref('')
		const status_claim = ref(null)
		const options = ref([ 
		{
			label: 'Semua',
			value: null
		},
		{
			label: 'Sudah Bayar',
			value: 'sudah_bayar'
		},
		{
			label: 'Layak Bayar',
			value: 'layak_bayar'
		}
		])
		const filter = ref({})

		function onFilter() {
			filter.value.kode_distributor = kode_distributor.value ?? null
			filter.value.status_claim = status_claim.value ?? null
		}
		const router = useRouter()
		function openDetail(value){
			router.push({name:'Detail Promo Per Area',params:{id:value.id}})
		}


		return {
			options,columns,role,active,
			colorStatusPromo,statusPromo,formatRibuan,GeneralFormatDate,
			modalUpload,openUpload,Coretable,
			showLoading,hideLoading,successNotif,errorNotif,
			requesting,
			kode_distributor,status_claim,filter,onFilter,
			openDetail,
		}
	}
}
</script>
<style >
.laporan-klaim{
	height: calc(100vh - 110px);
	display: grid;
	grid-template-rows: auto 36px;
}
</style>