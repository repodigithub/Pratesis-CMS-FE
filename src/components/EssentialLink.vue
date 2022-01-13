<template>
  <q-item
    clickable
    :to="{name: title}"
    exact
    style="padding-left:30px;"
    active-class="bg-primary4"
  >
    <q-item-section>
      <q-item-label class=" text-primary">
        <q-img
          :src="require(`assets/icon/${icon}.svg`)"
          spinner-color="primary"
          spinner-size="5px"
          style="width:18px;height:18px;"
          v-if="icon"
          class="q-mr-sm"
        />
        {{ title }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
