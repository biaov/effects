<script setup lang="ts">
import BatteryCharge from './components/battery-charge'
</script>

<template>
  <div class="container">
    <battery-charge />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
