<template>
  <div class="font-inter">
    <Header />
    <Categories />
    <main class="min-h-screen">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Categories from '~/components/Categories.vue'
</script>

<style>
html {
  font-family: 'Inter', sans-serif;
}
</style> 