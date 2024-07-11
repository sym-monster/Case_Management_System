<template>
  <div class="top">
    <div class="content">病历管理</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.top {
  display: flex;
  height: 80px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  z-index: 999;
  position: fixed;
  background-color: white;
  .content {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
}
</style>