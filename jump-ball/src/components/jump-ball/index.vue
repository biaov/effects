<script lang="ts" setup>
defineOptions({
  name: 'JumpBall'
})

const random = (min: number, max: number) => ~~(Math.random() * (max - min + 1) + min)

const list = Array.from({ length: 200 }, (_, i) => ({
  delay: `-${19973 + i * 200}ms`,
  duration: 7000 + i * 10,
  left: `${200 + random(0, 100)}`,
  background: `rgba(${random(50, 255)},${random(50, 255)},${random(50, 255)})`
}))
</script>
<template>
  <div class="circle">
    <div class="camera x">
      <div class="camera">
        <div class="camera">
          <div class="particles">
            <div class="particle" v-for="(item, index) in list" :key="index">
              <div class="rotate" :style="`animation-delay:${item.delay};animation-duration:${item.duration}ms;--delay:${item.delay};`">
                <div class="part" :style="`left:calc(50% + ${item.left}px);`">
                  <div class="rotatefollow" :style="`animation-delay:${item.delay};animation-duration:${item.duration}ms;`">
                    <div class="camerafollow">
                      <div class="camerafollow">
                        <div class="camerafollow x">
                          <div class="graphic" :style="`background:${item.background};animation-delay:${item.delay};`"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
body {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 600px;
}

div {
  transform-style: preserve-3d;
}
</style>
<style lang="less" scoped>
@import './index.less';
</style>
