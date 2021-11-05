<!--
 * @Description: 
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 10:41:18
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 14:41:58
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="in-out">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else-if="!$route.meta.keepAlive" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
.fade-enter {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
