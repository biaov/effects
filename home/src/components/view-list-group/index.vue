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
@size: 48px;
.wrap {
  position: relative;
  z-index: 2;
  padding: calc(@size / 2);
  max-width: calc(1616px + @size);
  width: 100%;
  margin: 0 auto;
}
@media (max-width: 1920px) {
  .wrap {
    max-width: calc(1206px + @size);
  }
}

@media (max-width: 1600px) {
  .wrap {
    max-width: calc(796px + @size);
  }
}

@media (max-width: 860px) {
  .wrap {
    max-width: calc(386px + @size);
  }
}
</style>
