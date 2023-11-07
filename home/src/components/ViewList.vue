<script setup lang="ts">
import { linkPrefixURL } from '@/config'
import countdown from '@/assets/count-down.png'
import type { ListItem } from './types'

/**
 * 列表数据
 */
const listData: ListItem[] = [
  {
    title: '倒计时',
    stack: 'HTML5 + CSS3 + JavaScript + jQuery',
    createDate: '2023-11-07',
    coverUrl: countdown,
    link: 'count-down'
  }
].map(item => ({
  ...item,
  link: linkPrefixURL + item.link
}))

/**
 * 跳转到详情页
 */
const onNavTo = (item: ListItem) => {
  window.open(item.link, '_blank')
}
</script>

<template>
  <div class="wrap">
    <div class="container">
      <div v-for="(item, index) in listData" :key="index" class="item" @click="onNavTo(item)">
        <div class="img w-fill">
          <img :src="item.coverUrl" mode="cover" class="w-fill h-fill" />
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="stack">{{ item.stack }}</div>
          <div class="date">{{ item.createDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrap {
  width: 1200px;
  padding: 40px 0;
  margin: 0 auto;
  .container {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 60px);
    .item {
      width: 400px;
      margin: 0 20px 20px 0;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
      .img {
        height: 300px;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
      }
      .text {
        padding: 30px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        .title {
          margin-bottom: 10px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: bold;
          font-size: 16px;
        }
        .stack {
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
