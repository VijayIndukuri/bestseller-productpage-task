<template>
  <div class="mb-8 content-center">
    <!-- Main categories (top level) -->
    <div class="flex flex-wrap gap-3 justify-center mb-4">
        <ul class="flex gap-8 mt-8 justify-center">
            <li 
                v-for="category in topLevelCategories" 
                :key="category.id" 
                class="font-light hover:text-blue-600 transition-colors cursor-pointer"
                :class="{ 'bg-blue-200 shadow-sm': selectedCategory && selectedCategory.id === category.id }"
                @click="toggleCategory(category)"
            >
                <div v-if="category.categories">
                    {{ category.name.en || category.name.dk }}
                </div>
                <NuxtLink
                v-else
                :to="`/products?category=${category.id}`"
                class=""
                >
                    {{ category.name.en || category.name.dk }}
                </NuxtLink>
            </li>
        </ul>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '@/data/data.json'

const emit = defineEmits(['selectedCategory'])
// Get the category structure from data
const rootCategory = ref(data.categories)
const selectedCategory = ref(null)

// Get only the top-level categories
const topLevelCategories = computed(() => {
    let topLevelCategories = []
    rootCategory.value.categories.forEach(category => {
        if (category.id === 'kids') {
            topLevelCategories.push(category)
        }
        else if (category.id === 'adults') {
            let adultsCategories = []
            category.categories.forEach(subCategory => {
                adultsCategories.push(subCategory)
            })
            topLevelCategories = [...topLevelCategories, ...adultsCategories]
        }
    })
    return topLevelCategories
})

const toggleCategory = (category) => {
  if (selectedCategory.value && selectedCategory.value.id === category.id) {
    // If clicking the same category again, close the dropdown
    selectedCategory.value = null
  } else {
    // Otherwise, select this category to show its subcategories
    selectedCategory.value = category
    
  }
  emit('selectedCategory', selectedCategory.value)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
