<template>
  <header class="text-black py-5 border-b border-gray-100">
    <div class="container mx-auto">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold tracking-widest mb-4">CLOTHING STORE</h1>
        <nav>
          <ul class="flex gap-8">
            <li><NuxtLink to="/" class="font-light hover:text-blue-600 transition-colors">All</NuxtLink></li>
            <li><NuxtLink to="/products" class="font-light hover:text-blue-600 transition-colors">Products</NuxtLink></li>
            <li><NuxtLink to="/contact" class="font-light hover:text-blue-600 transition-colors">Men</NuxtLink></li>
            <li><NuxtLink to="/contact" class="font-light hover:text-blue-600 transition-colors">Women</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header component logic
</script> 