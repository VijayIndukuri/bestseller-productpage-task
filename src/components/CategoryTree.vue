<template>
  <div class="flex justify-center my-4">
    <!-- If it has children, show as a parent category with children underneath -->
    <div v-if="hasSubcategories" class="flex flex-col items-center">
      <!--div class="text-center mb-2">
        <span class="font-medium text-gray-700">{{ category.name.en || category.name.dk }}</span>
      </div-->
      
      <!-- Render children in a centered flex layout with less gap -->
      <div class="flex flex-wrap justify-center max-w-2xl gap-x-6 gap-y-2">
        <div v-for="subcategory in category.categories" 
             :key="subcategory.id" 
             class="child-category">
          <NuxtLink
            :to="`/products?category=${subcategory.id}`"
            class="text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            {{ subcategory.name.en || subcategory.name.dk }}
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- If it has no children, show as a clickable link -->
    <div v-else class="text-center">
      <NuxtLink
        :to="`/products?category=${category.id}`"
        class="text-gray-600 hover:text-gray-900"
      >
        {{ category.name.en || category.name.dk }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

// Check if the category has subcategories
const hasSubcategories = computed(() => {
  return props.category.categories && props.category.categories.length > 0
})
</script> 