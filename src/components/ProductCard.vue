<template>
  <div class="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
    <div v-if="hasImages" class=" relative w-full object-cover rounded mb-4">
      <img :src="currentImage" class="w-full h-full object-cover rounded mb-4">
      <button v-if="hasMultipleImages" class="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded-full" @click="prevImage">
        <Icon name="mdi:chevron-left" class="w-4 h-4" />
      </button>
      <button v-if="hasMultipleImages" class="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded-full" @click="nextImage">
        <Icon name="mdi:chevron-right" class="w-4 h-4" />
      </button>
    </div>
    <h2 class="text-xl font-bold">{{ product.name?.dk || 'Product Name' }}</h2>
    <!--p class="my-2">{{ product.description?.dk }}</p-->
    <p class="my-2">{{ product.price || 'Price not available' }}</p>
    <NuxtLink :to="`/products/${product.id}`" class="text-blue-500 hover:underline block mt-2">
      View Details
    </NuxtLink>
  </div>
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
</script> 