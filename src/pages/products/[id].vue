<template>
  <div class="container mx-auto p-6">
    <div v-if="product">
      <h1 class="text-3xl font-bold mb-6">{{ product.name }}</h1>
      <p class="mb-4">{{ product.description }}</p>
      <div class="mt-6">
        <NuxtLink to="/products" class="text-blue-500 hover:underline">Back to Products</NuxtLink>
      </div>
    </div>
    <div v-else class="text-red-500">
      Product not found
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = parseInt(route.params.id)

// Local product data
const products = [
  { 
    id: 1, 
    name: 'Product 1', 
    description: 'Detailed description for product 1' 
  },
  { 
    id: 2, 
    name: 'Product 2', 
    description: 'Detailed description for product 2' 
  },
  { 
    id: 3, 
    name: 'Product 3', 
    description: 'Detailed description for product 3' 
  }
]

const product = products.find(p => p.id === productId)
</script> 