<template>
  <div class="row q-px-lg" style="margin-top:-18px;" >
        <div class="col-12">
            <q-card class="own-card" flat style="border-radius:20px !important;">
              <q-card-section class="text-center q-pt-sm">
                <div class="fs-12">Lihat Berdasarkan :</div>
                <q-btn-group outline>
                    <q-btn :outline="category === 'SH' ? false : true " no-caps color="primary" label="Sales Hierarchy" unelevated @click="category = 'SH'" :class="category === 'SH' ? '' : 'bg-primary4'"/>
                    <q-btn :outline="category === 'P' ? false : true " color="primary" label="Product" unelevated @click="category = 'P'" :class="category === 'P' ? '' : 'bg-primary4'" no-caps/>
                </q-btn-group>
              </q-card-section>
            </q-card>
        </div>
    </div>
    <div class="row q-col-gutter-lg q-px-lg justify-center">
        <div class="col" style="margin-top:20px;" v-for="section in sectionFirst" :key="section.label">
            <core-table
                :url="section.apiSuffix"
                :showPaginate="false"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="section.columns">
                <template v-slot:toptable>
                  <div class="fs-18">Budget Berdasarkan {{section.label}}</div>
                </template>
                <template v-slot:body-cell-budget="props">
                    <q-td key="budget" :props="props">
                      <div class="row">
                        <div class="col">
                          Rp. {{formatRibuan(props.row.budget)}}
                        </div>
                      </div>
                    </q-td>
                </template>
            </core-table>
        </div>
    </div>

      <div class="row q-col-gutter-lg q-px-lg justify-center">
        <div class="col" v-for="section in sectionSecond" :key="section.label" style="margin-top:20px;">
              <core-table
                :url="section.apiSuffix"
                :showPaginate="false"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="section.columns">
                <template v-slot:toptable>
                  <div class="fs-18">Budget Berdasarkan {{section.label}}</div>
                </template>
                <template v-slot:body-cell-budget="props">
                    <q-td key="budget" :props="props">
                      <div class="row">
                        <div class="col">
                          Rp. {{formatRibuan(props.row.budget)}}
                        </div>
                      </div>
                    </q-td>
                </template>
            </core-table>
        </div>
      </div>
      <div class="row q-px-lg q-pb-lg" style="margin-top:20px;">
        <div class="col-12">
          <q-card class="own-card" style="border-radius:20px !important;">
            <q-card-section>
              <div class="text-h6">Area</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row">
                <div class="col-12" style="height:242px;">
                      <l-map
                            v-model="zoom"
                            v-model:zoom="zoom"
                            :center="[0.285854562773834, 115.20186774227211]"
                          >
                            <l-tile-layer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            ></l-tile-layer>
                            <l-control-layers />
                            <l-marker :lat-lng="[-6.92787372772287, 107.60671180897711]" draggable>
                              <l-tooltip>
                                ITC Kebon Kelapa
                              </l-tooltip>
                            </l-marker>

                            <l-marker :lat-lng="[-1.6218355080706264, 103.587257824901]" draggable >
                              <l-tooltip>
                                Jamtos Jambi
                              </l-tooltip>
                            </l-marker>
                            <l-marker :lat-lng="[-7.75900731493278, 110.39957941050827]" draggable >
                              <l-tooltip>
                                hartono mall
                              </l-tooltip>
                            </l-marker>
                        </l-map>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import "leaflet/dist/leaflet.css";
export default {
  setup(){
    const { formatRibuan } = usePratesis()
    const { getData  } = useService()
    const areaMap = ref([])
    const baseColumns = [{ name: 'budget', align: 'right', label: 'Budget', field: 'budget'}]
    const sectionFirst = [
      {
        label:'Divisi',
        apiSuffix: 'dashboard/by-divisi',
        columns:[{ name: 'nama_divisi', align: 'left', label: 'Nama Divisi', field: 'nama_divisi'}, ...baseColumns ],
      },
      {
        label:'Brand',
        apiSuffix: 'dashboard/by-brand',
        columns: [{ name: 'nama_brand', align: 'left', label: 'Nama brand', field: 'nama_brand'},...baseColumns],
      }
    ]
    const sectionSecond = [
      {
        label:'Region',
        apiSuffix: 'dashboard/by-region',
        columns : [{ name: 'nama_region', align: 'left', label: 'Nama region', field: 'nama_region'},...baseColumns]
      },
      {
        label:'Area',
        apiSuffix: 'dashboard/by-area',
        columns:[{ name: 'nama_area', align: 'left', label: 'Nama area', field: 'nama_area'},...baseColumns]
      }
    ]
    onMounted(()=>{
        getData(`dashboard/area`).then(res=> {
          if(res.status == 200) {
            areaMap.value = res.data.data.filter(e => e.titik_koordinat -= null)
          }
        })
    })
    return {
      areaMap,
      formatRibuan,
      sectionSecond,
      sectionFirst
    }
  },
  data(){
      return{
          category:'SH',
          zoom: 3,
          iconWidth: 25,
          iconHeight: 40,
    }
  },
  components:{
      'core-table': defineAsyncComponent(() => import('components/CoreTable')),
      LMap,
      LTileLayer,
      LMarker,
      LControlLayers,
      LTooltip,
  },
}
</script>

<style>

</style>