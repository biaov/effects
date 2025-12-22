<template>
  <!-- 菜单列表 -->
  <div class="menu-list fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.4)] z-10 flex justify-between items-center" v-if="showMenuList">
    <div class="p-24">
      <img src="/logo.svg" alt="logo" class="w-20 object-cover" />
    </div>
    <div class="p-24" @click="showModal = true">
      <img src="../../assets/menu.svg" alt="close" class="w-20 object-cover" />
    </div>
  </div>
  <!-- 菜单弹窗 -->
  <div
    class="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.8)] z-[11] transition-all duration-300 overflow-hidden"
    :style="{ height: showModal ? '100%' : '0', opacity: showModal ? 1 : 0 }"
    @click.stop
    @touchmove.stop
  >
    <div class="absolute top-0 right-0 p-20" @click="showModal = false">
      <img src="../../assets/close.svg" alt="close" class="w-20 object-cover" />
    </div>
    <div class="p-15 pt-40 h-full overflow-auto">
      <div class="mb-10" v-for="(item, index) in listData" :key="index">
        <div class="text-xl text-[rgba(255,255,255,0.8)]">{{ item.title }}</div>
        <a :href="subItem.link" class="text-white text-base font-bold p-10 hover:text-[#ff6600]" v-for="(subItem, subIndex) in item.items" :key="subIndex" @click="onNavTo(subItem)">
          {{ subItem.title }}
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useViewList } from '@/components/view-list-group/hook'

const showMenuList = window.innerWidth < 768
const showModal = ref(false)
const { listData, onNavTo } = useViewList()
</script>
