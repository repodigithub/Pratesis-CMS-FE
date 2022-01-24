<template>
    <q-drawer
      v-model="leftDrawerOpen"
    >
    <div class="sidebar">
      <q-img
        src="~assets/dashboard/logo.png"
        spinner-color="primary"
        spinner-size="30px"
      />
      <q-scroll-area class="fit ">
        <q-list style="margin-top:40px;">
          <div v-for="(active,index) in activemenu" :key="active.title">
                <div v-if="active.submenu">
                    <q-expansion-item
                        expand-separator
                        header-style="padding-left:30px;"
                        expand-icon-class="text-primary"
                        v-if="active.submenu.length > 0"
                        group="menugroup"
                        v-model="masterexpand[index]"
                    >
                    <template v-slot:header >
                        <q-item-section>
                        <q-item-label class=" text-primary">
                            <q-img
                            :src="require(`assets/icon/${active.icon}.svg`)"
                            spinner-color="primary"
                            spinner-size="5px"
                            style="width:18px;height:18px;"
                            class="q-mr-sm"
                            />
                            {{active.title}}
                        </q-item-label>
                        </q-item-section>
                    </template>
                        <div v-for="(link,ind) in activesubmenu(active.submenu)" :key="link.title">
                            <div v-if="link.submenu">
                                <q-expansion-item
                                    expand-separator
                                    expand-icon-class="text-primary"
                                    :label="link.title"
                                    header-class="text-primary"
                                    header-style="padding-left:60px;"
                                    group="submenugroup"
                                    v-model="submenuexpand[ind]"
                                >
                                <EssentialLink
                                    v-for="last in link.submenu"
                                    style="padding-left:80px;"
                                    :key="last.title"
                                    v-bind="last"
                                />
                                </q-expansion-item>
                            </div>
                            <div v-else>
                                <EssentialLink
                                style="padding-left:60px;"
                                v-bind="link"
                                @click="collapsesubmenu"
                                />
                            </div>
                        </div>
                    </q-expansion-item>
                </div>
                <div v-else>
                    <EssentialLink
                        v-bind="active"
                        @click="collapseall"
                    />
                </div>
            </div>
        
        </q-list>
      </q-scroll-area>
    </div>
    </q-drawer>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { menu } from 'src/common/menu'
import { ref } from 'vue'
export default {
components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(true)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data(){
    return{
      role:'headoffice',
      menu:menu,
      masterexpand:{},
      submenuexpand:{}
    }
  },
  mounted(){
    if(this.$route.name === 'User'){
      if(Object.keys(this.masterexpand).length < 0){
        this.masterexpand = {
          1 : true
        }
      }else{
        this.masterexpand[1] = true
      }
    }
    else if(this.$route.name === 'Ubah Profil'){
      if(Object.keys(this.masterexpand).length < 0){
        this.masterexpand = {
          2 : true
        }
      }else{
        this.masterexpand[2] = true
      }
    }

  },
    computed:{
        activesubmenu(){
            return val => val.filter(m => m.access[this.role])
        },
        activemenu(){
            return this.menu.filter(m => m.access[this.role])
        }
    },
    methods:{
      collapseall(){
        if(Object.keys(this.masterexpand).length > 0){
          for (let key in this.masterexpand) {
            // skip loop if the property is from prototype
            if (!this.masterexpand.hasOwnProperty(key)) continue;

            this.masterexpand[key] = false
          }
        }
      },
      collapsesubmenu(){
        if(Object.keys(this.submenuexpand).length > 0){
          for (let key in this.submenuexpand) {
            // skip loop if the property is from prototype
            if (!this.submenuexpand.hasOwnProperty(key)) continue;

            this.submenuexpand[key] = false
          }
        }
      }
    }
}
</script>

<style>

</style>