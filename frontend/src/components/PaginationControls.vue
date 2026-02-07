<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const inputPage = ref(props.currentPage);

watch(() => props.currentPage, (val) => {
  inputPage.value = val;
});

const handlePageChange = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page);
  }
};

const handleInputJump = () => {
    let p = parseInt(inputPage.value);
    if (isNaN(p)) {
        inputPage.value = props.currentPage;
        return;
    }
    
    if (p < 1) p = 1;
    if (p > props.totalPages) p = props.totalPages;
    
    if (p !== props.currentPage) {
        handlePageChange(p);
    } else {
        inputPage.value = p;
    }
}
</script>

<template>
  <div class="pagination-container">
    <div class="pagination-group">
        <button 
        @click="handlePageChange(1)" 
        :disabled="currentPage === 1"
        class="page-btn nav-btn"
        :title="t('ui_first_page')"
        >
        « {{ t('ui_first_page') }}
        </button>
        <button 
        @click="handlePageChange(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="page-btn nav-btn"
        >
        ‹ {{ t('ui_prev_page') }}
        </button>
    </div>
    
    <div class="page-info">
      <!-- <span>{{ t('ui_page_curr') }}</span> -->
      <input 
        type="number" 
        v-model="inputPage" 
        @keydown.enter="handleInputJump"
        @blur="handleInputJump"
        class="page-input"
        min="1"
        :max="totalPages"
      />
      <span class="total-text"> / {{ totalPages }}</span>
    </div>

    <div class="pagination-group">
        <button 
        @click="handlePageChange(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="page-btn nav-btn"
        >
        {{ t('ui_next_page') }} ›
        </button>
        <button 
        @click="handlePageChange(totalPages)" 
        :disabled="currentPage === totalPages"
        class="page-btn nav-btn"
        :title="t('ui_last_page')"
        >
        {{ t('ui_last_page') }} »
        </button>
    </div>
  </div>
</template>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 30px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    padding: 10px;
}

.pagination-group {
    display: flex;
    gap: 8px;
}

.page-btn {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
}

.page-btn:hover:not(:disabled) {
    border-color: #E91E63;
    color: #E91E63;
    background-color: #fff0f5;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f9f9f9;
}

.nav-btn {
    font-weight: 500;
}

.page-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
    background: white;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #eee;
}

.page-input {
    width: 50px;
    text-align: center;
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
}

.page-input:focus {
    border-color: #E91E63;
    outline: none;
    box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.1);
}

.total-text {
    font-weight: 500;
}

/* Hide number input spinners */
.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.page-input[type=number] {
  -moz-appearance: textfield;
}

@media (max-width: 600px) {
    .pagination-container {
        gap: 10px;
    }
    .page-btn {
        padding: 6px 10px;
        font-size: 12px;
    }
}
</style>
