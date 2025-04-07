<template>
  <div class="category-item">
    <!-- If it has children, show as a label with expandable section -->
    <div v-if="hasSubcategories" class="category-parent">
      <div class="category-parent-label" :style="{ paddingLeft: `${level * 16}px` }">
        <span class="font-medium text-gray-700">{{ category.name.dk || category.name.en }}</span>
      </div>
      
      <!-- Recursively render children -->
      <div class="category-children">
        <div v-if="level > 0" class="category-line" :style="{ left: `${level * 16 - 8}px` }"></div>
        <CategoryTree 
          v-for="subcategory in category.categories" 
          :key="subcategory.id"
          :category="subcategory"
          :level="level + 1"
        />
      </div>
    </div>
    
    <!-- If it has no children, show as a clickable link -->
    <div v-else class="category-leaf">
      <div :style="{ paddingLeft: `${level * 16}px` }" class="flex items-center">
        <span class="bullet-point mr-2"></span>
        <NuxtLink
          :to="`/products?category=${category.id}`"
          class="px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors inline-block"
        >
          {{ category.name.dk || category.name.en }}
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
.category-parent {
  position: relative;
  margin-bottom: 8px;
}

.category-parent-label {
  padding-top: 6px;
  padding-bottom: 6px;
  position: relative;
  font-weight: 500;
}

.category-parent-label::before {
  content: "›";
  display: inline-block;
  margin-right: 6px;
  font-size: 18px;
  font-weight: bold;
  color: #4b5563;
}

.category-children {
  position: relative;
  margin-top: 4px;
}

.category-line {
  position: absolute;
  top: 0;
  bottom: 8px;
  width: 1px;
  background-color: #e5e7eb;
}

.category-leaf {
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
}

.bullet-point {
  width: 6px;
  height: 6px;
  background-color: #3b82f6;
  border-radius: 50%;
  display: inline-block;
}
</style> 