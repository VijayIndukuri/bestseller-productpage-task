<template>
  <div class="container mx-auto p-6">
    <div class="mb-2 text-gray-400 text-sm">
      <Icon name="mdi:chevron-left" class="text-black hover:underline" />
      <NuxtLink to="/products" class="hover:underline">Back to Products</NuxtLink>
    </div>
    <div v-if="product" class="grid grid-cols-5 md:flex-row gap-6">
      <div v-if="productImages.length > 0" class="col-span-3 flex flex-col items-center">
        <img :src="currentImage" class="w-2/3 rounded shadow-lg">
        <div class="flex mt-4 gap-2">
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
      <div class="col-span-2">
        <h1 class="text-xl font-bold mb-6">{{ product.name.dk || product.name.en }}</h1>
        <p class="text-xl font-semibold mb-4">{{ product.price }} kr</p>
        
        <!-- Color options with visual indicator -->
        <div class="mb-4">
          <p class="mb-2">Color: {{ product.color }}</p>
          <div class="flex space-x-2">
            <div 
              v-for="(color, idx) in availableColors" 
              :key="idx" 
              class="w-8 h-8 rounded-full border cursor-pointer"
              :class="selectedColor === color ? 'ring-2 ring-blue-500' : ''"
              :style="{ backgroundColor: getColorCode(color) }"
              @click="selectedColor = color"
            ></div>
          </div>
        </div>
        
        <!-- Size selection -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <p>Select size</p>
            <button class="text-sm text-blue-600 underline">What is my size?</button>
          </div>
          <div class="grid grid-cols-3 gap-2 mb-2">
            <button 
              v-for="(size, idx) in product.size" 
              :key="idx" 
              class="py-2 border rounded-md hover:border-black"
              :class="selectedSize === size ? 'border-black font-semibold' : 'border-gray-300'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="flex space-x-2 mb-6">
          <button class="flex-1 bg-black text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800">
            Add to cart
          </button>
          <button class="border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-100">
            <Icon name="mdi:heart-outline" size="24" />
          </button>
        </div>
        
        <!-- Additional info -->
        <div class="border-t pt-6 space-y-4">
          <div class="flex items-start">
            <Icon name="mdi:truck-delivery-outline" class="mt-1 mr-3" size="20" />
            <p>Free delivery over 399 KR</p>
          </div>
          <div class="flex items-start">
            <Icon name="mdi:rotate-right" class="mt-1 mr-3" size="20" />
            <p>100 day returns</p>
          </div>
          <div class="flex items-start">
            <Icon name="mdi:credit-card-outline" class="mt-1 mr-3" size="20" />
            <p>Buy now pay later with Klarna</p>
          </div>
          <div class="flex items-start">
            <Icon name="mdi:shopping-outline" class="mt-1 mr-3" size="20" />
            <p>New items every day</p>
          </div>
        </div>
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
const selectedSize = ref('')
const selectedColor = ref('')

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

// Get available colors from product variants
const availableColors = computed(() => {
  if (!product.value) return []
  
  const colors = [product.value.color]
  if (product.value.variant) {
    product.value.variant.forEach(v => {
      if (v.color && !colors.includes(v.color)) {
        colors.push(v.color)
      }
    })
  }
  return colors.filter(Boolean)
})

// Helper function to convert color names to CSS color codes
const getColorCode = (colorName: string) => {
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
    'Green': '#00FF00',
    'Blue': '#0000FF',
    'Grey': '#808080',
    'Light Grey': '#D3D3D3',
    'Dark Grey': '#A9A9A9',
    'Stormy Weather': '#4F666A',
    'Potting Soil': '#3A2E39',
    'Silver Mink': '#C4AEAD'
  }
  
  return colorMap[colorName] || '#CCCCCC'
}
</script> 