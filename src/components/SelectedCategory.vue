<template>
    <!-- Nested category tree (only shown when a category is selected) -->
    <div v-if="props.selectedCategory" class="w-[100vw] font-light">
      <!--h3 class="text-center text-gray-700 mb-4 font-medium border-b border-gray-100 pb-3">
        {{ selectedCategory.name.en || selectedCategory.name.dk }}
      </h3-->
      <div v-if="selectedCategory.categories" class="flex flex-wrap justify-center gap-4">
        <div v-for="category in selectedCategory.categories" :key="category.id" class="flex flex-col gap-4" @click="subSelection(category)">
            
            <div v-if="category.categories" class="flex flex-wrap content-center gap-4 cursor-pointer">
                <p>{{ category.name.en || category.name.dk }}</p>
            </div>
            <div v-else>
                <NuxtLink
                :to="`/products?category=${category.id}`"
                class=""
                >
                    {{ category.name.en || category.name.dk }}
                </NuxtLink>
            </div>
        </div>
      </div>
      <div v-if="selectedSubCategory" class="">
        <div class="">
            <CategoryTree 
                :category="selectedSubCategory" 
                :level="0" 
            />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryTree from './CategoryTree.vue'

const props = defineProps({
    selectedCategory: {
        type: Object,
        required: true
    }
})
const selectedSubCategory = ref(null)
const subSelection = (category) => {
    if (category.categories) {
        selectedSubCategory.value = category
    }
    else {
        selectedSubCategory.value = null
    }
}
</script>
<style scoped>
.category-tree {
  padding: 0 20px;
}

.category-container {
  transition: all 0.3s ease;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
}

.category-container::-webkit-scrollbar {
  height: 6px;
}

.category-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.category-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.category-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>