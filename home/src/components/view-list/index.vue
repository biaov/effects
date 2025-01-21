<script setup lang="ts">
import { useViewList } from './hook'

defineOptions({
  name: 'ViewList'
})

const { listData, onNavTo } = useViewList()
</script>

<template>
  <div class="wrap">
    <view class="header">
      <div class="title">特效集锦</div>
      <a target="_blank" href="https://github.com/biaov/effects" title="访问源码"><img src="@/assets/github.svg"
          alt="github" class="github" /></a>
    </view>
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
@keyframes floating {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-15px);
  }
}

.wrap {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 40px 0;

    .title {
      font-size: 30px;
      font-weight: bold;
    }

    .github {
      width: 40px;
      height: 40px;
      object-fit: contain;
      transform: scale(0.9);
      opacity: 0.8;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;

    .item {
      width: 386px;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      transition: all 0.3s ease;
      animation: floating ease-in-out 1.6s infinite alternate;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
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
          display: inline-flex;
          flex-wrap: wrap;
          gap: 10px;

          span {
            margin-bottom: 10px;
            padding: 2px 8px;
            border-radius: 4px;
            background: #f0f0f0;
            @bgcs: #1677ff, #eb2f96, #13c2c2, #722ed1, #52c41a, #fa8c16;

            each(@bgcs, {
              &:nth-child(@{index}) {
                background: @value;
              }
            });
        }
      }
    }
  }
}
}

@media (max-width:800px) {
  .wrap {
    .container {
      .item {
        width: 100%;
      }
    }
  }
}
</style>
