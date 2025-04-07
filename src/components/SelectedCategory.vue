<template>
    <!-- Nested category tree (only shown when a category is selected) -->
    <div v-if="selectedCategory" class="w-[100vw] h-[100px] border-b border-gray-100">

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
</template>

<script setup>
//import { ref } from 'vue'
//import CategoryTree from './CategoryTree.vue'

const props = defineProps({
    selectedCategory: {
        type: Object,
        required: true
    }
})
console.log(props.selectedCategory)
</script>
<style scoped>
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