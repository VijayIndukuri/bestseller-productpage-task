<template>
  <div class="">
    <!-- Main categories (top level) mobile view -->
    <div class="md:hidden w-full py-4">
      <div class="relative">
        <button 
          class="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none" 
          @click="toggleMobileMenu()"
        >
        <Icon v-if="!isMobileMenuOpen" name="uil:bars" class="w-4 h-4" />
        <Icon v-else name="uil:times" class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <!-- Main categories (top level) desktop view -->
    <div class="hidden md:block flex flex-wrap gap-3 justify-center mb-4">
        <ul class="flex gap-8 mt-4 justify-center">
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

const emit = defineEmits(['selectedCategory', 'mobileMenuOpen', 'topLevelCategories'])
// Get the category structure from data
const rootCategory = ref(data.categories)
const selectedCategory = ref(null)
const isMobileMenuOpen = ref(false)
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
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  emit('mobileMenuOpen', isMobileMenuOpen.value)
  if (isMobileMenuOpen.value) {
    emit('topLevelCategories', topLevelCategories.value)
  }
  else {
    emit('topLevelCategories', [])
  }
}
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
