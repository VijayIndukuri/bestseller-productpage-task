<template>
  <header ref="headerRef" class="text-black py-5 border-b border-gray-100">
    <div class="container mx-auto">
      <div class="flex flex-row items-center md:justify-between justify-center my-4">
        <Categories ref="categoriesRef" @selectedCategory="handleSelectedCategory" @mobileMenuOpen="handleMobileMenuOpen" @topLevelCategories="handleTopLevelCategories" class="md:relative absolute left-4" />
        <h1 class="text-xl font-bold"><NuxtLink to="/">CLOTHING STORE</NuxtLink></h1>
        <div class="md:relative absolute right-4">
            <div class="md:block hidden">
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
            <div class="md:hidden">
            <button 
                class="text-gray-400 hover:text-blue-600"
                @click="toggleHandleSearch = !toggleHandleSearch"
            >
                <Icon name="uil:search" class="w-6 h-6" />
            </button>
            </div>
        </div>
      </div>
      <div v-if="toggleHandleSearch" class="md:hidden mt-3 px-4 w-full"> 
        <div class="relative flex items-center">
          <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search products..." 
              class="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:border-blue-500"
              @keyup.enter="handleSearch"
          />
          <button 
              class="absolute right-3 text-gray-400 hover:text-blue-600"
              @click="handleSearch"
          >
              <Icon name="uil:search" class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden font-light flex flex-col w-fullitems-center justify-between border-t border-gray-200">
        <ul class="py-1">
          <li v-for="category in topLevelCategories" :key="category.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer mx-auto border-b border-gray-200 flex  items-center justify-between" @click="selectedCategory = category">
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
            <Icon v-if="category == selectedCategory" name="mdi:chevron-down" class="w-4 h-4" />
            <Icon v-else name="mdi:chevron-right" class="w-4 h-4" />
          </li>
        </ul>
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
  if (headerRef.value) {
    // Check if the click is outside the header element
    if (!headerRef.value.contains(event.target)) {
      selectedCategory.value = null
      mobileMenuOpen.value = false
      toggleHandleSearch.value = false
    }
  }
}
const mobileMenuOpen = ref(false)
const handleMobileMenuOpen = (isOpen) => {
    mobileMenuOpen.value = isOpen
}
const topLevelCategories = ref([])
const handleTopLevelCategories = (categories) => {
    topLevelCategories.value = categories
}

const toggleHandleSearch = ref(false)

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 