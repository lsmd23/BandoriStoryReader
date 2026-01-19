<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchEvents } from '../services/mockData';

// 1. 响应式数据 (Reactivity)
// ref 用于定义基本类型的响应式变量。当 searchQuery 改变时，界面会自动更新。
const searchQuery = ref('');
const eventList = ref([]);
const loading = ref(true);

// 2. 生命周期 (Lifecycle)
// onMounted 会在组件挂载完成后执行，通常在这里发起数据请求
onMounted(async () => {
  try {
    const data = await fetchEvents();
    eventList.value = data; // 更新响应式数据
  } catch (e) {
    console.error("加载失败", e);
  } finally {
    loading.value = false;
  }
});

// 3. 计算属性 (Computed Properties)
// 这是一个非常强大的功能。它会根据依赖的数据（searchQuery 和 eventList）自动重新计算。
// 实现了你的需求：人物关系检索/相关内容检索（这里演示最基础的文字过滤）
const filteredEvents = computed(() => {
  if (!searchQuery.value) return eventList.value;
  
  const query = searchQuery.value.toLowerCase();
  return eventList.value.filter(event => 
    event.title.toLowerCase().includes(query) || 
    event.eventName.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="story-list">
    <!-- 搜索框区域 -->
    <div class="search-bar">
      <!-- v-model 是双向绑定：输入框的值会自动同步到 searchQuery 变量 -->
      <input 
        v-model="searchQuery" 
        placeholder="搜索活动名称或标题..." 
        type="text"
        class="search-input"
      />
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      正在读取剧情数据...
    </div>

    <!-- 列表展示区域 -->
    <div v-else class="events-container">
      <div v-if="filteredEvents.length === 0" class="no-results">
        没有找到相关活动。
      </div>

      <!-- v-for 指令用于循环渲染列表 -->
      <div 
        v-for="event in filteredEvents" 
        :key="event.id" 
        class="event-card"
      >
        <div class="event-header">
          <span class="event-id">#{{ event.id }}</span>
          <h3>{{ event.title }}</h3>
        </div>
        <p class="original-name">{{ event.eventName }}</p>
        <p class="synopsis">{{ event.synopsis }}</p>
        
        <div class="actions">
          <button>阅读剧情 ({{ event.stories.length }}章)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.story-list {
  width: 100%;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #E91E63;
  outline: none;
}

.event-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.1);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-id {
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

h3 {
  margin: 0;
  color: #333;
}

.original-name {
  color: #888;
  font-size: 14px;
  margin: 4px 0 8px 0;
}

.synopsis {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.actions button {
  background-color: #E91E63;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.actions button:hover {
  background-color: #D81B60;
}
</style>