<script setup>
import StoryList from './components/StoryList.vue';
</script>

<template>
  <div class="container">
    <h1>Bandori Story Reader</h1>
    <p>邦邦剧情阅读器 - 前端开发预览</p>
    
    <!-- 使用我们刚刚创建的组件 -->
    <div class="content-area">
      <StoryList />
    </div>
  </div>
</template>

<style scoped>
/* 简单的样式 */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  color: #E91E63; /* 邦邦粉 */
}
</style>
