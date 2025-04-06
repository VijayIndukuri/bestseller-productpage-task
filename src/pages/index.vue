<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-3xl font-semibold tracking-tight mb-2">Products</h1>
    <p class="text-gray-500 mb-8 font-light">Explore our collection of quality clothing</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script setup>
import data from '@/data/data.json'
const products = data.products;
</script> 