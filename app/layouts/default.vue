<template>
  <div class="flex min-h-screen">
    <!-- Left Navigation Bar -->
    <nav
      :class="[
        isCollapsed ? 'w-16' : 'w-64',
        'transition-all duration-300 bg-gray-50 border-r border-gray-200 p-0 flex flex-col',
      ]"
    >
      <div
        class="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 relative px-4 pt-4"
      >
        <h3
          v-show="!isCollapsed"
          class="m-0 text-gray-800 text-lg font-semibold"
        >
          Navigation
        </h3>
        <button
          @click="toggleSidebar"
          class="bg-transparent border-none text-xl cursor-pointer p-1 rounded hover:bg-gray-100 hover:text-gray-900 transition"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <span
            :class="[
              'inline-block transition-transform duration-300',
              isCollapsed ? 'rotate-180' : '',
            ]"
            >›</span
          >
        </button>
      </div>
      <ul class="flex-1 list-none p-0 m-0 flex flex-col gap-2">
        <li v-for="item in navRoutes" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="group flex items-center transition-all duration-200 rounded-lg px-2 py-3"
            :class="[
              isCollapsed ? 'justify-center' : 'gap-3',
              $route.path === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <span class="text-xl min-w-[20px] text-center">{{
              item.icon
            }}</span>
            <span
              v-show="!isCollapsed"
              class="transition-opacity duration-200"
              >{{ item.label }}</span
            >
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-1 p-8 transition-all duration-300">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { navRoutes } from "~/navigation/routes";

const isCollapsed = ref(false);
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
const $route = useRoute();
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
