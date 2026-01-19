// 这是一个模拟的数据文件，用于在后端准备好之前测试前端
// 结构参考了 database.json

export const events = [
    {
        id: "1",
        eventName: "SAKURA＊BLOOMING PARTY!",
        // 取第一个本地化标题演示
        title: "SAKURA*BLOOMING！",
        synopsis: "春。満開の桜を眺めるポピパの５人。遠くから謎の雄叫びが聞こえてきて……？",
        stories: [
            { title: "Opening", caption: "Opening" },
            { title: "What is a Sakura Party?", caption: "Chapter 1" }
        ]
    },
    {
        id: "2",
        eventName: "思い繋ぐ、未完成な歌",
        title: "Unfinished Song, Connecting Thoughts",
        synopsis: "Roselia respective event.",
        stories: [
            { title: "Opening", caption: "Opening" },
            { title: "Determination", caption: "Chapter 1" }
        ]
    }
];

// 模拟异步获取数据（就像真的在请求后端一样）
export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500); // 假装网络延迟 500ms
    });
};