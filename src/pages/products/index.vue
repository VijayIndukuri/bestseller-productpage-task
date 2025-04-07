<template>
  <div class="container mx-auto p-6">
    <div v-if="filteredProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
    <div v-else class="text-center py-8">
      <p class="text-gray-500">No products found matching your search criteria</p>
    </div>
    <div class="mt-4">
      <NuxtLink to="/" class="text-blue-500 hover:underline">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import data from '@/data/data.json'

const route = useRoute()
const allProducts = ref(data.products)
const searchQuery = ref('')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search.toString()
  }
})

watch(() => route.query.search, (newVal) => {
  if (newVal) {
    searchQuery.value = newVal.toString()
  } else {
    searchQuery.value = ''
  }
})

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return allProducts.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return allProducts.value.filter(product => {
    const name = product.name?.dk?.toLowerCase() || ''
    const description = product.description?.dk?.toLowerCase() || ''
    return name.includes(query) || description.includes(query)
  })
})
</script> 