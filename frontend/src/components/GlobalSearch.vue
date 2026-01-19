<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);
const query = ref('');

const handleSearch = () => {
  if (query.value.trim()) {
    emit('search', query.value);
  }
};
</script>

<template>
  <div class="global-search">
    <div class="search-wrapper">
      <input 
        v-model="query" 
        @keyup.enter="handleSearch"
        type="text" 
        placeholder="搜索剧情、角色台词、歌曲..." 
        class="search-input"
      />
      <button @click="handleSearch" class="search-btn">
        <span class="icon">🔍</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.global-search {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-wrapper {
  display: flex;
  background: white;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
  padding: 5px;
  transition: box-shadow 0.3s;
}

.search-wrapper:focus-within {
  box-shadow: 0 6px 16px rgba(233, 30, 99, 0.25);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 20px;
  font-size: 16px;
  outline: none;
  color: #333;
}

.search-input::placeholder {
  color: #aaa;
}

.search-btn {
  background: #E91E63;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #D81B60;
}

.icon {
  font-size: 18px;
}
</style>