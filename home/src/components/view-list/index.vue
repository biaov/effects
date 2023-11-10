<script setup lang="ts">
import { useViewList } from './hook'

defineOptions({
  name: 'ViewList'
})

const { listData, onNavTo } = useViewList()
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
          <div class="stack">
            <span v-for="(tag, i) in item.tags" :key="i">{{ tag }}</span>
          </div>
          <div class="date">创建时间：{{ item.createDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrap {
  position: relative;
  z-index: 2;
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
          color: #fff;
          margin-bottom: 10px;
          display: inline-flex;
          flex-wrap: wrap;
          span {
            margin-right: 10px;
            padding: 2px 8px;
            border-radius: 4px;
            background: #f0f0f0;
            @bgcs: #1677ff, #eb2f96, #13c2c2, #722ed1, #52c41a, #fa8c16;
            each(@bgcs,{
              &:nth-child(@{index}){
                background: @value;
              }
            });
          }
        }
      }
    }
  }
}
</style>
