<template>
  <div class="category-item">
    <!-- If it has children, show as a label with expandable section -->
    <div v-if="hasSubcategories" class="">
      <div class="">
        <span class="font-medium text-gray-700">{{ category.name.en || category.name.dk }}</span>
      </div>
      
      <!-- Render children in a horizontal layout -->
      <div class="flex flex-col gap-4">
        <div v-for="subcategory in category.categories" 
             :key="subcategory.id" 
             class="">
          <CategoryTree 
            :category="subcategory"
            :level="0"
          />
        </div>
      </div>
    </div>
    
    <!-- If it has no children, show as a clickable link -->
    <div v-else class="">
      <div class="flex items-center">
        <NuxtLink
          :to="`/products?category=${category.id}`"
          class=""
        >
          {{ category.name.en || category.name.dk }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})

// Check if the category has subcategories
const hasSubcategories = computed(() => {
  return props.category.categories && props.category.categories.length > 0
})
</script>

<style scoped>
</style> 