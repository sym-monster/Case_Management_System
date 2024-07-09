<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="all">
    <Top />
    <div class="content">
      <router-view></router-view>
    </div>
    <Bottom />
  </div>
</template>

<style scoped lang="scss">
.all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    display: flex;
    width: 100%;
    min-height: 600px;
    background-color: yellow;
  }
}
</style>
