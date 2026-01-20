<script setup>
import { ref, defineEmits, watch } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const languages = [
  { code: 'cn', label: '简体中文' },
  { code: 'tw', label: '繁體中文' },
  { code: 'jp', label: '日本語' },
  { code: 'kr', label: '한국어' },
  { code: 'en', label: 'English' }
];

const selectedLang = ref(props.modelValue || 'cn');

watch(() => props.modelValue, (newVal) => {
  if (newVal) selectedLang.value = newVal;
});

const selectLang = (code) => {
  selectedLang.value = code;
  emit('update:modelValue', code);
};
</script>

<template>
  <div class="language-selector">
    <div 
      v-for="lang in languages" 
      :key="lang.code"
      class="lang-option"
      :class="{ active: selectedLang === lang.code }"
      @click="selectLang(lang.code)"
    >
      <img 
        :src="`https://bestdori.com/res/icon/${lang.code}.svg`" 
        :alt="lang.label" 
        class="lang-icon"
      />
      <span class="lang-label">{{ lang.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  background: white;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  width: fit-content;
  margin: 0 auto; /* Center it */
  gap: 5px;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  opacity: 0.6;
  filter: grayscale(0.8);
}

.lang-option:hover {
  background: #f5f5f5;
  opacity: 0.9;
  filter: grayscale(0.4);
}

.lang-option.active {
  background: #E91E63; /* Use brand color */
  color: white;
  opacity: 1;
  filter: grayscale(0);
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
}

.lang-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.lang-label {
  font-size: 0.9rem;
  font-weight: bold;
}
</style>