const token = '';
const headers = {
    'Authorization': `Bot ${token}`,
    'Content-Type': 'application/json',
};
let postData = {
    "content": "",
    "tts": false,
    "embeds": [
        {
            "type": "rich",
            "title": "",
            "description": `今日天氣晴朗，天氣稍微轉涼，請適時添加保暖衣物`,
            "color": 0x00FFFF,
            "fields": [
                {
                    "name": `(星期一)`,
                    "value": `天氣晴朗`,
                    "inline": true
                },
                {
                    "name": `(星期二)`,
                    "value": `晴時多雲`,
                    "inline": true
                },
                {
                    "name": ` ( 星期三)`,
                    "value": `晴時多雲`,
                    "inline": true
                },
                {
                    "name": ` ( 星期四)`,
                    "value": `晴時多雲`,
                    "inline": true
                },
                {
                    "name": ` ( 星期五)`,
                    "value": `晴時多雲`,
                    "inline": true
                },
                {
                    "name": ` ( 星期六)`,
                    "value": `午後雷陣雨`,
                    "inline": true
                },
                {
                    "name": ` ( 星期日)`,
                    "value": `午後雷陣雨`,
                    "inline": true
                }
            ],
            "image": {
                "url": `https://i.imgflip.com/4/4rk1nr.jpg`,
                "height": 0,
                "width": 0
            },
            "thumbnail": {
                "url": `https://www.meme-arsenal.com/memes/08c8e81bca58574de13de82d54b59238.jpg`,
                "height": 0,
                "width": 0
            },
            "author": {
                "name": `貓貓探員`,
                "icon_url": `https://i.imgflip.com/4/4rk1nr.jpg`
            },
            "footer": {
                "text": `10-17-2023`,
                "icon_url": `https://www.meme-arsenal.com/memes/08c8e81bca58574de13de82d54b59238.jpg`
            }
        }
    ]
};

const endpoint = '';
const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(postData),
};

fetch(endpoint, options)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('發生錯誤：', error);
    });