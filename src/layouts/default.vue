<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">My Nuxt App</h1>
        <nav>
          <ul class="flex gap-4">
            <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-gray-300">About</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-gray-300">Products</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="min-h-screen">
      <slot />
    </main>
    
    <footer class="bg-gray-800 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        <p>&copy; {{ new Date().getFullYear() }} My Nuxt App</p>
      </div>
    </footer>
  </div>
</template> 