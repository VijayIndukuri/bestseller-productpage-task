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
import data from '@/data/data.json'
const products = data.products;
</script> 