<template>
  <NuxtLink to="/products" class="block relative hover:opacity-90 transition-opacity h-full">
    <div :class="'w-full h-full relative'">
      <img 
        :src="promotion.image.imageUrl" 
        :alt="promotion.image.alt || promotion.imageAltText || 'Promotional content'" 
        class="w-full h-full object-cover"
        :style="aspectRatioStyle"
      >
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  promotion: {
    type: Object,
    required: true
  }
})

const aspectRatioStyle = computed(() => {
  if (props.promotion.image.aspectRatio) {
    const [width, height] = props.promotion.image.aspectRatio.split(':').map(Number)
    if (width && height) {
      return {
        aspectRatio: `${width}/${height}`
      }
    }
  }
  return {}
})
</script> 