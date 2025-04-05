<template>
  <div class="container mx-auto p-6">
    <div v-if="product">
      <h1 class="text-3xl font-bold mb-6">{{ product.name.dk || product.name.en }}</h1>
      <div v-if="productImages.length > 0" class="mb-6">
        <img :src="currentImage" class="w-1/2 mx-auto rounded shadow-lg">
        <div class="flex justify-center mt-4 gap-2">
          <img 
            v-for="(image, idx) in productImages" 
            :key="idx" 
            :src="image" 
            class="w-16 h-16 object-cover cursor-pointer border-2"
            :class="currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'" 
            @click="currentImageIndex = idx"
          />
        </div>
      </div>
      <div class="mb-4">
        <p class="text-xl font-semibold">{{ product.price }} kr</p>
        <p class="mb-2">Brand: {{ product.brand }}</p>
        <p class="mb-2">Color: {{ product.color }}</p>
        <div class="mb-2">
          <span class="mr-2">Available sizes:</span>
          <span v-for="(size, idx) in product.size" :key="idx" class="mr-2">{{ size }}</span>
        </div>
      </div>
      <div class="mt-6">
        <NuxtLink to="/products" class="text-blue-500 hover:underline">Back to Products</NuxtLink>
      </div>
    </div>
    <div v-else class="text-red-500">
      Product not found
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import data from '@/data/data.json'

const route = useRoute()
const productId = parseInt(route.params.id as string)
const currentImageIndex = ref(0)

// Find the product by ID from the data.json
const product = computed(() => {
  return data.products.find(p => p.id === productId)
})

// Get product images
const productImages = computed(() => {
  return product.value?.images || []
})

// Current displayed image
const currentImage = computed(() => {
  return productImages.value[currentImageIndex.value] || ''
})
</script> 