<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-3">
      <NuxtLink 
        v-for="category in categories" 
        :key="category.slug" 
        :to="`/products?category=${category.slug}`"
        class="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-md transition-colors"
      >
        {{ category.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import data from '@/data/data.json'

const categories = ref(data.categories)
</script>
