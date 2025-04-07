<template>
  <header ref="headerRef" class="text-black py-5 border-b border-gray-100">
    <div class="container mx-auto">
      <div class="flex flex-row items-center justify-between">
        <!--nav>
          <ul class="flex gap-8">
            <li><NuxtLink to="/products" class="font-light hover:text-blue-600 transition-colors">Men</NuxtLink></li>
            <li><NuxtLink to="/" class="font-light hover:text-blue-600 transition-colors">Women</NuxtLink></li>
            <li><NuxtLink to="/" class="font-light hover:text-blue-600 transition-colors">Kids</NuxtLink></li>
          </ul>
        </nav-->
        <Categories ref="categoriesRef" @selectedCategory="handleSelectedCategory" />
        <h1 class="text-xl font-bold tracking-widest"><NuxtLink to="/">CLOTHING STORE</NuxtLink></h1>
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search products..." 
            class="pl-3 pr-10 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:border-blue-500"
            @keyup.enter="handleSearch"
          />
          <button 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
            @click="handleSearch"
          >
            <Icon name="uil:search" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <SelectedCategory v-if="selectedCategory" ref="selectedCategoryRef" :selectedCategory="selectedCategory" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Categories from './Categories.vue';
import SelectedCategory from './SelectedCategory.vue';
const router = useRouter()
const searchQuery = ref('')
const headerRef = ref(null)
const categoriesRef = ref(null)
const selectedCategoryRef = ref(null)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value }
    })
  }
}

const selectedCategory = ref(null)
const handleSelectedCategory = (category) => {
  //console.log(category) 
  selectedCategory.value = category
}

// Function to handle clicks outside of the category components
const handleClickOutside = (event) => {
  if (selectedCategory.value && headerRef.value) {
    // Check if the click is outside the header element
    if (!headerRef.value.contains(event.target)) {
      selectedCategory.value = null
    }
  }
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 