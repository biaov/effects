<template>
  <div class="wrap">
    <view-list v-for="(item, index) in listData" :item="item" :key="index" @clickItem="onNavTo" />
  </div>
</template>

<script setup lang="ts">
import ViewList from '@/components/view-list/index.vue'
import { useViewList } from './hook'

const { listData, onNavTo } = useViewList()
</script>

<style scoped lang="less">
.wrap {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}
</style>
