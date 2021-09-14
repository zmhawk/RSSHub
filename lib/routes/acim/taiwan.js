const got = require('@/utils/got');
const { simplecc } = require('simplecc-wasm');

module.exports = async (ctx) => {
    const link = 'https://www.acimtaiwan.info/Column/list.aspx';

    const response = await got.post(link, {
        body: 'Action=LoadProductList&Id=0&CurrentPage=1&pageLength=10',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    });
    const data = response.data;
    const list = data.oObj;

    ctx.state.data = {
        title: '奇迹专栏-所有文章', // 项目的标题
        link: 'https://www.acimtaiwan.info/Column/list.aspx', // 指向项目的链接
        description: '', // 描述项目
        language: '', // 频道语言
        allowEmpty: true, // 默认 false，设为 true 可以允许 item 为空
        item: list.map((i) => ({
            title: simplecc(i.Title, 't2s'), // 文章标题
            author: '', // 文章作者
            category: '', // 文章分类
            description: simplecc(i.Content, 't2s'), // 文章摘要或全文
            pubDate: i.PostTime, // 文章发布时间
            link: `https://www.acimtaiwan.info/Column/Article.aspx?id=${i.Id}`, // 指向文章的链接
        })),
    };
};
