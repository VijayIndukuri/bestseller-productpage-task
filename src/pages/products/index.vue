<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Products</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
    <div class="mt-4">
      <NuxtLink to="/" class="text-blue-500 hover:underline">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Local product data
const products = [
  { 
    id: 1, 
    name: 'Product 1', 
    description: 'Description for product 1' 
  },
  { 
    id: 2, 
    name: 'Product 2', 
    description: 'Description for product 2' 
  },
  { 
    id: 3, 
    name: 'Product 3', 
    description: 'Description for product 3' 
  }
]
</script> 