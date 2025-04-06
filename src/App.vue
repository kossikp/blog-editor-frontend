<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <router-view />
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
