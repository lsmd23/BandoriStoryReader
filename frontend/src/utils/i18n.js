/**
 * 文本多语言解析工具
 * Resolves multi-language text objects into a single string based on current language.
 * 
 * @param {string | object} text - The text to resolve. Can be a string or an object { cn: '', jp: '', en: '' }
 * @param {string} lang - The target language code ('cn', 'jp', 'en', etc.)
 * @returns {string} - The resolved text
 */
export const resolveText = (text, lang = 'cn') => {
    if (!text) return '';

    // 如果本身就是字符串，直接返回
    if (typeof text === 'string') return text;

    // 如果是对象，尝试获取对应语言
    if (typeof text === 'object') {
        // 1. 尝试直接获取
        if (text[lang]) return text[lang];

        // 2. Fallback 策略 (可以根据需求调整顺序)
        // 优先显示日文原文 (Bang Dream 语境下)，其次中文，其次英文
        if (text.jp) return text.jp;
        if (text.cn) return text.cn;
        if (text.en) return text.en;

        // 3. 如果都没有，返回第一个可用值
        const values = Object.values(text);
        if (values.length > 0) return values[0];
    }

    return String(text);
};
