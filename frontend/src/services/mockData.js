import { bands } from './bands';

// 0. 基础定义：角色与乐队
export { bands };

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
                        { id: "main_s1_c1_ep1", title: "Encounter" },
                        { id: "main_s1_c1_ep2", title: "Kasumi's Search" },
                        { id: "main_s1_c1_ep3", title: "Glittering Star" }
                    ]
                },
                {
                    id: "main_s1_ch2",
                    title: "Chapter 2: Gathering",
                    episodes: [
                        { id: "main_s1_c2_ep1", title: "Arisa's Basement" },
                        { id: "main_s1_c2_ep2", title: "Rimi's Chocolate" }
                    ]
                }
            ]
        },
        {
            id: "main_s2",
            season: 2,
            title: "Season 2",
            chapters: [
                {
                    id: "main_s2_ch1",
                    title: "Chapter 1: New Stage",
                    episodes: [{ id: "main_s2_c1_ep1", title: "Space is Closing?!" }]
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
                },
                {
                    id: "band_ppp_ch1",
                    title: "Chapter 1: First Live",
                    episodes: [{ id: "bp_1_1", title: "SPACE!" }, { id: "bp_1_2", title: "Audition" }]
                },
                {
                    id: "band_ppp_ch2",
                    title: "Chapter 2: Binary Star",
                    episodes: [{ id: "bp_2_1", title: "Star Festival" }]
                }
            ]
        },
        {
            bandId: 2, // Afterglow
            chapters: [
                {
                    id: "band_ag_ch1",
                    title: "Chapter 1: Afterglow's Sunset",
                    episodes: [{ id: "ag_1_1", title: "Roof Top" }, { id: "ag_1_2", title: "Same As Always" }]
                }
            ]
        },
        {
            bandId: 3, // Pastel*Palettes
            chapters: [
                {
                    id: "band_pasupale_ch1",
                    title: "Chapter 1: Pastel*Palettes, Shoots!",
                    episodes: [{ id: "pp_1_1", title: "Agency" }, { id: "pp_1_2", title: "First Live Failure" }]
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
                },
                {
                    id: "band_roselia_ch2",
                    title: "Chapter 2: Neo-Aspect",
                    episodes: [{ id: "ros_2_1", title: "Gears" }, { id: "ros_2_2", title: "Clock" }]
                }
            ]
        },
        {
            bandId: 5, // HHW
            chapters: [
                {
                    id: "band_hhw_ch1",
                    title: "Chapter 1: Smiles for the World!",
                    episodes: [{ id: "hhw_1_1", title: "Hello!" }, { id: "hhw_1_2", title: "Happy!" }]
                }
            ]
        },
        {
            bandId: 21, // Morfonica (Using standard ID)
            chapters: [
                { id: "band_morfn_ch1", title: "Fly with the night", episodes: [] }
            ]
        },
        {
            bandId: 18, // RAS (Using standard ID)
            chapters: [
                { id: "band_ras_ch1", title: "R·I·O·T", episodes: [] }
            ]
        },
        {
            bandId: 45, // MyGO (Using standard ID 45)
            chapters: [
                { id: "band_mygo_ch1", title: "It's MyGO!!!!!", episodes: [] }
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
        },
        {
            characterId: 1, // Kasumi
            cardId: "card_102",
            title: "[Start of the Story] Toyama Kasumi",
            episodes: [
                { id: "card_102_ep1", title: "Random Star" }
            ]
        },
        {
            characterId: 5, // Saya
            cardId: "card_501",
            title: "[Big Yamabuki Bakery] Yamabuki Saya",
            episodes: [
                { id: "card_501_ep1", title: "New Bread" },
                { id: "card_501_ep2", title: "Discount!" }
            ]
        },
        {
            characterId: 16, // Yukina
            cardId: "card_1601",
            title: "[Songstress] Minato Yukina",
            episodes: [
                { id: "card_1601_ep1", title: "Solo Practice" }
            ]
        },
        {
            characterId: 21, // Kokoro
            cardId: "card_2101",
            title: "[Detective] Tsurumaki Kokoro",
            episodes: [
                { id: "card_2101_ep1", title: "Mystery!" },
                { id: "card_2101_ep2", title: "Michelles Identity" }
            ]
        }
    ],

    // 小对话 (Other/Mini Stories) - 区域对话，Live后对话等
    otherStories: [
        {
            id: "area_1",
            type: "Area Conversation",
            title: "CiRCLE: Kasumi & Yukina",
            characters: [1, 16],
            preview: "Trying to feed a cat?"
        },
        {
            id: "live_1",
            type: "Live Interaction",
            title: "Waiting Room: Kokoro & Misaki",
            characters: [21, 22],
            preview: "Michelle's head..."
        },
        {
            id: "lounge_1",
            type: "Lounge",
            title: "Cafeteria: Tae & Saaya",
            characters: [2, 5],
            preview: "Bread vs. Rabbit"
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