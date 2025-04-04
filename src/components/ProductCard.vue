<template>
  <div class="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
    <h2 class="text-xl font-bold">{{ product.name }}</h2>
    <p class="my-2">{{ product.description }}</p>
    <NuxtLink :to="`/products/${product.id}`" class="text-blue-500 hover:underline block mt-2">
      View Details
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script> 