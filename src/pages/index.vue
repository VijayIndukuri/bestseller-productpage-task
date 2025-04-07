<template>
  <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <p class="text-gray-500 mb-6 sm:mb-8 font-light text-center sm:text-left">Explore our collection of quality clothing</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div v-for="card in allCards" 
           :key="card.id" 
           :class="[
             card.type == 'product' ? 'max-w-full sm:max-w-[420px] max-h-[512px]': sizeClass(card.promotion.type),
             'w-full'
           ]">
        <ProductCard v-if="card.type == 'product'" 
          :product="card.product" 
        />
        <PromotionCard v-if="card.type == 'promotion'"
          :promotion="card.promotion"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '@/data/data.json'
import PromotionCard from '@/components/PromotionCard.vue'

const products = ref(data.products)
const promotionalSpots = ref(data.promotionalSpots)

const allCards = computed(() => {
  let cards = [];
  products.value.map(product => {
    cards.push({
      product: product,
      promotion: null,
      type: 'product',
      id: product.id
    })
  });
  promotionalSpots.value.map(promotion => {
    cards.splice(promotion.position, 0, {
      promotion: promotion,
      product: null,
      type: 'promotion',
      id: promotion.id
    })
  });
  return cards;
})

const sizeClass = ((type) => {
  switch (type) {
    case '2x2':
      return 'sm:row-span-2 sm:col-span-2'
    case '2x1':
      return 'sm:row-span-1 sm:col-span-2 max-h-[494px]'
    case '1x2':
      return 'sm:row-span-2 sm:col-span-1'
    case '1x1':
    default:
      return 'sm:row-span-1 sm:col-span-1'
  }
})
</script> 