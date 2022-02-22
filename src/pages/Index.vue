<template>
  <q-page class="flex flex-center">
    <h1>Overview</h1>
    <!-- <q-select
      filled
      v-model="model"
      multiple
      :options="options"
      :loading="loading"
      @virtual-scroll="onScroll"
      virtual-scroll-slice-size=21
    /> -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, computed, nextTick } from 'vue'

const allOptions = []
for (let i = 0; i <= 100000; i++) {
  allOptions.push('Opt ' + i)
}

const pageSize = 50
const lastPage = Math.ceil(allOptions.length / pageSize)

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const loading = ref(false)
    const nextPage = ref(2)
    const options = computed(() => allOptions.slice(0, pageSize * (nextPage.value - 1)))

    return {
      model: ref(null),
      loading,

      nextPage,
      options,

      onScroll ({ to, ref }) {
        const lastIndex = options.value.length - 1
        console.log("to",to)
        console.log("lastIndex",lastIndex)
        
        if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
          loading.value = true

          setTimeout(() => {
            nextPage.value++
            nextTick(() => {
              ref.refresh()
              loading.value = false
            })
          }, 500)
        }
      }
    }
  }
})

</script>
