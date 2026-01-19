<script setup>
import StoryDashboard from './components/StoryDashboard.vue';
</script>

<template>
  <div class="app-background">
    <div class="container">
      <div class="header-branding">
        <img src="https://bang-dream.com/img/footer-logo.png" alt="Bandori Logo" class="brand-logo" />
        <h1 class="brand-title">Story Reader</h1>
      </div>
      
      <!-- 主仪表盘组件 -->
      <div class="main-content">
        <StoryDashboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-background {
  min-height: 100vh;
  width: 100vw;
  /* 使用 fixed 定位或 min-height 确保覆盖全屏 */
  position: absolute;
  top: 0;
  left: 0;
  
  /* 背景图片设置 */
  background-image: url('https://bang-dream.com/img/top/kv-slide-loading-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 让里面的内容可以滚动 */
  overflow-y: auto;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
  position: relative; /* 确保在背景之上 */
}

.header-branding {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.brand-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.brand-title {
  color: #E91E63; /* 邦邦粉 */
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.main-content {
  width: 100%;
}
</style>
