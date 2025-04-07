<template>
  <NuxtLink to="/products" class="block relative hover:opacity-90 transition-opacity h-full">
    <div :class="[sizeClass, 'w-full h-full relative']">
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

const sizeClass = computed(() => {
  switch (props.promotion.type) {
    case '2x2':
      return 'row-span-2 col-span-2'
    case '2x1':
      return 'row-span-2 col-span-1'
    case '1x2':
      return 'row-span-1 col-span-2'
    case '1x1':
    default:
      return 'row-span-1 col-span-1'
  }
})
</script> 