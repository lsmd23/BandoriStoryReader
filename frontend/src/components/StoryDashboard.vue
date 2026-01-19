<script setup>
import { ref, onMounted } from 'vue';
import { fetchCategory, searchService, bands } from '../services/mockData';
import GlobalSearch from './GlobalSearch.vue';
import LanguageSelector from './LanguageSelector.vue';
import '../assets/long-list-styles.css'; // 引入新的长条形列表样式

// 状态管理
const currentTab = ref('events'); // 默认显示活动剧情
const searchResults = ref(null);
const isSearching = ref(false);

// 各类数据容器
const eventStories = ref([]);
const mainStories = ref([]);
const bandStories = ref([]);
const cardStories = ref([]);
const otherStories = ref([]);

// 初始加载数据
onMounted(async () => {
  eventStories.value = await fetchCategory('eventStories');
  mainStories.value = await fetchCategory('mainStories');
  bandStories.value = await fetchCategory('bandStories');
  cardStories.value = await fetchCategory('cardStories');
  otherStories.value = await fetchCategory('otherStories');
});

// 处理全局搜索
const performSearch = async (query) => {
  isSearching.value = true;
  searchResults.value = await searchService(query);
  currentTab.value = 'search_results'; // 切换到搜索结果页
  isSearching.value = false;
};

// 重置（回到主页）
const resetView = () => {
    currentTab.value = 'events';
    searchResults.value = null;
}

const getBandName = (id) => bands.find(b => b.id === id)?.name || 'Unknown Band';

</script>

<template>
  <div class="dashboard">
    <!-- 顶部全域搜索区 -->
    <header class="dashboard-header">
      <GlobalSearch @search="performSearch" />
      <div class="lang-select-container">
        <LanguageSelector />
      </div>
    </header>

    <!-- 主导航 Tab -->
    <nav class="category-nav" v-if="currentTab !== 'search_results'">
      <button 
        :class="{ active: currentTab === 'events' }" 
        @click="currentTab = 'events'"
      >活动剧情</button>
      <button 
        :class="{ active: currentTab === 'main' }" 
        @click="currentTab = 'main'"
      >主线剧情</button>
      <button 
        :class="{ active: currentTab === 'band' }" 
        @click="currentTab = 'band'"
      >乐队剧情</button>
      <button 
        :class="{ active: currentTab === 'card' }" 
        @click="currentTab = 'card'"
      >卡面剧情</button>
      <button 
        :class="{ active: currentTab === 'other' }" 
        @click="currentTab = 'other'"
      >小对话</button>
    </nav>

    <div v-if="currentTab === 'search_results'" class="back-nav">
        <button @click="resetView">← 返回浏览模式</button>
        <h2>搜索结果</h2>
    </div>

    <!-- 内容展示区 -->
    <main class="content-viewport">
      
      <!-- 搜索结果视图 -->
      <div v-if="currentTab === 'search_results'" class="results-view">
        <div v-if="isSearching" class="loading">搜索中...</div>
        <div v-else-if="!searchResults || searchResults.length === 0" class="empty">无结果</div>
        <div v-else class="result-list">
            <div v-for="(res, idx) in searchResults" :key="idx" class="result-card">
                <div class="tag">{{ res.type }}</div>
                <div v-if="res.type === '对话'" class="dialogue-result">
                    <div class="char-avatar-placeholder">{{ res.characterId }}</div>
                    <p class="dialogue-text">"{{ res.text }}"</p>
                    <small>来源: {{ res.source }}</small>
                </div>
                <div v-else class="std-result">
                    <h4>{{ res.title }}</h4>
                    <small>{{ res.match }}</small>
                </div>
            </div>
        </div>
      </div>

      <!-- 1. 活动剧情视图 -->
      <div v-else-if="currentTab === 'events'" class="grid-view">
        <div v-for="story in eventStories" :key="story.id" class="story-card event-card">
            <div class="card-cover-placeholder">Banner</div>
            <div class="card-info">
                <h3>{{ story.title }}</h3>
                <span class="badge">{{ story.episodes.length }} 话</span>
            </div>
        </div>
      </div>

      <!-- 2. 主线剧情视图 - 长条形列表 -->
      <div v-else-if="currentTab === 'main'" class="list-view-container">
         <div v-for="season in mainStories" :key="season.id" class="season-group">
             <h2 class="section-title">{{ season.title }}</h2>
             <div class="story-strip-list">
                 <div v-for="chap in season.chapters" :key="chap.id" class="story-strip">
                     <div class="strip-content">
                         <div class="strip-header">
                            <h4>{{ chap.title }}</h4>
                            <span class="strip-badge">{{ chap.episodes.length }} 话</span>
                         </div>
                         <p class="strip-desc">Main Story Chapter</p>
                     </div>
                     <button class="action-btn">Read</button>
                 </div>
             </div>
         </div>
      </div>

      <!-- 3. 乐队剧情视图 - 按乐队分组的组件 -->
      <div v-else-if="currentTab === 'band'" class="list-view-container">
          <div v-for="bandStory in bandStories" :key="bandStory.bandId" class="band-group-component">
              <div class="band-header">
                  <div class="band-logo-placeholder">{{ getBandName(bandStory.bandId)[0] }}</div>
                  <h3>{{ getBandName(bandStory.bandId) }}</h3>
              </div>
              
              <div class="story-strip-list">
                  <div v-for="chap in bandStory.chapters" :key="chap.id" class="story-strip band-strip">
                      <div class="strip-content">
                          <h4>{{ chap.title }}</h4>
                          <div class="meta-info">
                            <span class="strip-badge">{{ chap.episodes.length }} 话</span>
                          </div>
                      </div>
                      <button class="action-btn">Read</button>
                  </div>
              </div>
          </div>
      </div>

      <!-- 4. 卡面剧情视图 - 改为网格布局 (复用 event-card 样式) -->
      <div v-else-if="currentTab === 'card'" class="grid-view">
          <div v-for="card in cardStories" :key="card.cardId" class="story-card event-card">
              <!-- 下一步：接入真实头像 -->
              <div class="card-cover-placeholder">
                 <small>ID: {{ card.characterId }}</small>
              </div>
              <div class="card-info">
                  <h3>{{ card.title }}</h3>
                  <span class="badge">{{ card.episodes.length }} 话</span>
              </div>
          </div>
      </div>

      <!-- 5. 小对话视图 - 长条形列表 -->
      <div v-else-if="currentTab === 'other'" class="list-view-container">
          <div class="story-strip-list">
              <div v-for="story in otherStories" :key="story.id" class="story-strip">
                  <div class="strip-content">
                      <div class="strip-header">
                        <h4>{{ story.title }}</h4>
                        <span class="strip-badge">{{ story.type }}</span>
                      </div>
                      <p class="strip-desc">{{ story.preview }}</p>
                      <small class="mini-meta">Characters: {{ story.characters.join(', ') }}</small>
                  </div>
                  <button class="action-btn">View</button>
              </div>
          </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
}

.dashboard-header {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lang-select-container {
    display: flex;
    justify-content: center;
}

/* 导航栏样式 */
.category-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-nav button {
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid transparent;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;
}

.category-nav button:hover {
  background: white;
  color: #E91E63;
}

.category-nav button.active {
  background: #E91E63;
  color: white;
  box-shadow: 0 4px 10px rgba(233, 30, 99, 0.3);
}

/* 内容卡片通用样式 */
.content-viewport {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 30px;
  min-height: 400px;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.story-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.story-card:hover {
  transform: translateY(-3px);
}

.card-cover-placeholder {
  height: 100px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.card-info {
  padding: 12px;
}

.card-info h3 {
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #333;
}

.badge {
  font-size: 12px;
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #666;
}

/* 乐队视图样式 */
.band-section {
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
}
.band-title {
    color: #E91E63;
    margin-bottom: 10px;
}
.chapter-chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.chip {
    background: #fff;
    border: 1px solid #E91E63;
    color: #E91E63;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 13px;
}

/* 搜索结果样式 */
.result-card {
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    border-left: 4px solid #E91E63;
}

.dialogue-result {
    display: flex;
    gap: 15px;
    align-items: center;
}

.char-avatar-placeholder {
    width: 40px;
    height: 40px;
    background: #ccc; /* 之后替换为真实头像 */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
}

.dialogue-text {
    font-style: italic;
    color: #444;
}

.back-nav {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}
</style>