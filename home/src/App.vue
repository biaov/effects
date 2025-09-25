<script setup lang="ts">
import ViewList from '@/components/view-list'

const qrcodeList = [
  {
    url: 'https://biaov.cn/static/official-account.jpg',
    label: '微信公众号'
  }
]
</script>

<template>
  <ViewList />
  <!-- 底部信息 -->
  <footer class="py-20 bg-white text-center text-info text-xs flex flex-col items-center gap-12">
    <div class="flex justify-center items-center">
      <div v-for="(item, index) in qrcodeList" :key="index" class="flex flex-col items-center justify-center">
        <img :src="item.url" alt="公众号" class="w-100 h-100" />
        <span class="text-info text-xs">{{ item.label }}</span>
      </div>
    </div>
    <p>版权所有@biaov</p>
    <a href="https://beian.miit.gov.cn" target="_blank" class="text-info hover:text-primary">湘ICP备18022869号-2</a>
  </footer>
</template>

<style lang="less">
@import './styles/reset.less';
</style>
