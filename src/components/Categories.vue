<template>
  <div class="mb-8 content-center">
    <!-- Main categories (top level) -->
    <div class="flex flex-wrap gap-3 justify-center mb-4">
      <div 
        v-for="category in topLevelCategories" 
        :key="category.id" 
        class="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
        :class="{ 'bg-blue-200 shadow-sm': selectedCategory && selectedCategory.id === category.id }"
        @click="toggleCategory(category)"
      >
        {{ category.name.dk || category.name.en }}
      </div>
    </div>

    <!-- Nested category tree (only shown when a category is selected) -->
    <div v-if="selectedCategory" class="category-container mt-5 bg-white py-4 px-5 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-center text-gray-700 mb-4 font-medium border-b border-gray-100 pb-3">
        {{ selectedCategory.name.dk || selectedCategory.name.en }}
      </h3>
      <div class="category-tree">
        <CategoryTree 
          :category="selectedCategory" 
          :level="0" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '@/data/data.json'

// Get the category structure from data
const rootCategory = ref(data.categories)
const selectedCategory = ref(null)

// Get only the top-level categories
const topLevelCategories = computed(() => {
  return rootCategory.value.categories || []
})

const toggleCategory = (category) => {
  if (selectedCategory.value && selectedCategory.value.id === category.id) {
    // If clicking the same category again, close the dropdown
    selectedCategory.value = null
  } else {
    // Otherwise, select this category to show its subcategories
    selectedCategory.value = category
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.category-tree {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.category-container {
  transition: all 0.3s ease;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.category-tree::-webkit-scrollbar {
  width: 6px;
}

.category-tree::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.category-tree::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.category-tree::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
