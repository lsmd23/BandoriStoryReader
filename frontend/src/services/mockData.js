// 模拟后端数据结构，反映 Bang Dream 的剧情分类

// 0. 基础定义：角色与乐队
export const bands = [
    { id: 1, name: "Poppin'Party", members: [1, 2, 3, 4, 5] },
    { id: 2, name: "Afterglow", members: [6, 7, 8, 9, 10] },
    { id: 3, name: "Pastel*Palettes", members: [11, 12, 13, 14, 15] },
    { id: 4, name: "Roselia", members: [16, 17, 18, 19, 20] },
    { id: 5, name: "Hello, Happy World!", members: [21, 22, 23, 24, 25] },
    // ... 其他乐队
];

// 1. 剧情内容的最小单位：对话 (Dialogue)
// 这是一个结构示例，实际数据可能非常多
const createDialogue = (id, charId, text) => ({
    id,
    characterId: charId, // 关联到 icon/
    text,
    audio: null,
    options: []
});

// 2. 剧情的容器：话 (Episode)
const createEpisode = (id, title, type, parentId) => ({
    id,
    title,
    type, // 'event', 'main', 'band', 'card'
    parentId, // 指向所属的活动/章节/卡面
    dialogues: [] // 包含具体的对话对象
});

// 模拟数据仓库
export const mockDatabase = {
    // 活动剧情 (Event Stories)
    eventStories: [
        {
            id: "event_1",
            title: "SAKURA＊BLOOMING PARTY!",
            banner: "event1_banner.png",
            episodes: [
                { id: "ev1_ep1", title: "Opening", preview: "春。満開の桜を眺める..." },
                { id: "ev1_ep2", title: "Chapter 1", preview: "お花見ってどんなもの？" }
            ]
        },
        {
            id: "event_2",
            title: "想い繋ぐ、未完成な歌",
            banner: "event2_banner.png",
            episodes: [
                { id: "ev2_ep1", title: "Opening", preview: "..." }
            ]
        }
    ],

    // 主线剧情 (Main Stories) - 有章节概念
    mainStories: [
        {
            id: "main_s1",
            season: 1,
            title: "Season 1",
            chapters: [
                {
                    id: "main_s1_ch1",
                    title: "Chapter 1: The Beginning",
                    episodes: [
                        { id: "main_s1_c1_ep1", title: "Encounter" }
                    ]
                }
            ]
        }
    ],

    // 乐队剧情 (Band Stories)
    bandStories: [
        {
            bandId: 1, // Poppin'Party
            chapters: [
                {
                    id: "band_ppp_ch0",
                    title: "Chapter 0: Poppin'Party Kessei",
                    episodes: [{ id: "bp_0_1", title: "Kasumi's Star" }]
                }
            ]
        },
        {
            bandId: 4, // Roselia
            chapters: [
                {
                    id: "band_roselia_ch1",
                    title: "Chapter 1: Bloom of the Blue Rose",
                    episodes: []
                }
            ]
        }
    ],

    // 卡面剧情 (Card Stories)
    cardStories: [
        {
            characterId: 1, // Kasumi
            cardId: "card_101",
            title: "[Kirakira Star] Toyama Kasumi",
            episodes: [
                { id: "card_101_ep1", title: "Training Hard!" },
                { id: "card_101_ep2", title: "After Practice" }
            ]
        }
    ]
};

// 模拟搜索服务
export const searchService = (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const q = query.toLowerCase();
            const results = [];

            // 简单演示：在活动剧情中搜索
            mockDatabase.eventStories.forEach(event => {
                if (event.title.toLowerCase().includes(q)) {
                    results.push({ type: '活动剧情', title: event.title, id: event.id, match: '标题匹配' });
                }
            });

            // 模拟：搜索到了具体的某一句对话 (Dialogue Object)
            if (q.includes("sakura")) {
                results.push({
                    type: '对话',
                    source: 'SAKURA＊BLOOMING PARTY! - Opening',
                    characterId: 1,
                    text: "Look! The Sakura is in full bloom!",
                    match: '内容匹配'
                });
            }

            resolve(results);
        }, 300);
    });
};

export const fetchCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDatabase[category] || []);
        }, 200);
    });
}