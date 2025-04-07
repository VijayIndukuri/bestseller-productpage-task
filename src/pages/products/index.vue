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
const categoryFilter = ref('')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search.toString()
  }
  
  if (route.query.category) {
    categoryFilter.value = route.query.category.toString()
  }
})

watch(() => route.query, (newVal) => {
  if (newVal.search) {
    searchQuery.value = newVal.search.toString()
  } else {
    searchQuery.value = ''
  }
  
  if (newVal.category) {
    categoryFilter.value = newVal.category.toString()
  } else {
    categoryFilter.value = ''
  }
}, { deep: true })

const filteredProducts = computed(() => {
  let filtered = allProducts.value
  
  // Filter by search query if present
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => {
      const name = product.name?.dk?.toLowerCase() || ''
      const description = product.description?.dk?.toLowerCase() || ''
      return name.includes(query) || description.includes(query)
    })
  }
  
  // Filter by category if present
  if (categoryFilter.value.trim()) {
    const category = categoryFilter.value.toLowerCase()
    filtered = filtered.filter(product => {
      return product.categories && product.categories.some(cat => 
        cat.toLowerCase() === category
      )
    })
  }
  
  return filtered
})
</script> 