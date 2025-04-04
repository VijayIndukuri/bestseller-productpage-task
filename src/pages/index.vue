<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Welcome to the Homepage</h1>
    <p class="mb-4">This is an example Nuxt 3 project with automatic routing.</p>
    <nav>
      <ul class="flex gap-4">
        <li><NuxtLink to="/about" class="text-blue-500 hover:underline">About</NuxtLink></li>
        <li><NuxtLink to="/products" class="text-blue-500 hover:underline">Products</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// Home page logic here
</script> 