<template>
  <NuxtLink :to="`/products/${product.id}`" class="block shadow-sm hover:shadow-md transition-shadow group no-underline">
    <div v-if="hasImages" class="relative w-full object-cover mb-4">
      <img :src="currentImage" class="w-full h-full object-cover mb-4">
      <button 
        class="absolute top-4 right-4 z-10"
        @click.stop="toggleFavorite"
      >
        <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="w-6 h-6" :class="isFavorite ? 'text-black' : 'text-gray-700'" />
      </button>
      <button v-if="hasMultipleImages" class="absolute top-1/2 left-0 transform -translate-y-1/2 text-black px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity" @click.stop="prevImage">
        <Icon name="mdi:chevron-left" class="w-8 h-8" />
      </button>
      <button v-if="hasMultipleImages" class="absolute top-1/2 right-0 transform -translate-y-1/2 text-black px-1 py-1 opacity-0  group-hover:opacity-100 transition-opacity" @click.stop="nextImage">
        <Icon name="mdi:chevron-right" class="w-8 h-8" />
      </button>
    </div>
    <div class="px-3 pb-3">
      <h2 class="text-sm">{{ product.name?.dk || 'Product Name' }}</h2>
    <!--p class="my-2">{{ product.description?.dk }}</p-->
    <p class="my-2 font-bold text-xs">{{ product.price || 'Price not available' }} DKK</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const imageIndex = ref(0)
const isFavorite = ref(false)

const productImages = computed(() => props.product.images || [])
const hasImages = computed(() => productImages.value && productImages.value.length > 0)
const hasMultipleImages = computed(() => productImages.value && productImages.value.length > 1)
const currentImage = computed(() => hasImages.value ? productImages.value[imageIndex.value] : '')

const nextImage = () => {
  if (!hasMultipleImages.value) return
  imageIndex.value = (imageIndex.value + 1) % productImages.value.length
}

const prevImage = () => {
  if (!hasMultipleImages.value) return
  imageIndex.value = imageIndex.value <= 0 ? productImages.value.length - 1 : imageIndex.value - 1
}

const toggleFavorite = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isFavorite.value = !isFavorite.value
}
</script> 