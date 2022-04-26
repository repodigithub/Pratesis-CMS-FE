<template>
  <q-page>
    <breadcrumb :rightside="false"/>

    <!-- Section Card  -->
    <div class="row q-col-gutter-lg q-px-md q-pt-lg section-card q-pb-xl">
      <div class="col-3" v-for="content in contentCard" :key="content">
        <div class="card-content">
          <div class="row">
              <div style="width:36px;height:36px;margin-right:10px; border-radius: 10px;" class="bg-white row justify-center items-center">
                <img :src="require(`assets/icon/${content.icon}`)">
              </div>
              <div class="fs-20" style="text-transform:capitalize;">{{content.label}}</div>
          </div>
          <div class="row q-mt-sm items-center" :class="content.active ? 'justify-between' : ''">
            <div class="text-grey1 q-mr-md">{{content.active ? 'Active' : 'Total'}}</div>
            <div class="row text-primary">
              <div class="fs-16" style="margin-right:5px;opacity:0.4;" v-if="!content.active">Rp</div>
              <div class="fs-24">{{formatRibuan(contentObj[content.label])}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Section Card  -->

    <!-- Section dashboard -->
    <component :is="sectionShow" />
    <!-- Section dashboard -->

  </q-page>
</template>

<script>
import { defineAsyncComponent,computed,ref, onMounted } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
export default{
  
  setup(){
    const contentObj = ref([])
    const { role,formatRibuan } = usePratesis()
    const sectionShow = computed(()=>{
      if (['HO','AD'].indexOf(role.value) >= 0) {
        return 'head-office'
      }else if(role.value == 'GA'){
        return 'depot'
      }else if(role.value == 'DI'){
        return 'distributor'
      }else{
        return ''
      }
    })
    
    const { getData } = useService()
    function getDataContent () {
      let valGroup = 'depot'
      if(sectionShow.value == 'head-office') valGroup = 'ho'
      if(sectionShow.value == 'distributor') valGroup = 'distributor'
   
      getData(`dashboard/mini-data?level=${valGroup}`).then(res=>{
        if(res.status == 200) {
          contentObj.value = res.data.data
        }
      })
    }
    onMounted(()=>{
        getDataContent()
    })

    return {
      formatRibuan,
      contentObj,
      role,
      sectionShow
    }
  },
  data(){
    return{
        contentCard:[
          {
            label : 'budget',
            icon : 'money-bill-alt-overview.svg',
            total : '1.000.000',
            active:false
          },
          {
            label : 'outstanding',
            icon : 'money-check-edit-alt.svg',
            total : '1.000.000',
            active:false
          },
          {
            label : 'claim',
            icon : 'money-check-edit-alt.svg',
            total : '1.000.000',
            active:false
          },
          {
            label : 'sisa',
            icon : 'ticket-alt.svg',
            total : '4352',
            active: true
          },
        ],
    }
  },
  components:{
      'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
      'head-office' : defineAsyncComponent(()=> import('components/Overview/HeadOffice')),
      'distributor' : defineAsyncComponent(()=> import('components/Overview/Distributor')),
      'depot' : defineAsyncComponent(()=> import('components/Overview/Depot'))
  },
}
</script>
<style lang="scss">
  .section-card{
    background-image: url("../assets/dashboard/gradientpolos.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .card-content{
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid #FFFFFF;
      box-shadow: 0px 8px 14px rgba(57, 69, 99, 0.08);
      backdrop-filter: blur(4px);
      border-radius: 20px;
      padding-top:14px;
      padding-left:20px;
      padding-right:20px;
      padding-bottom:22px;
    }
  }
</style>
