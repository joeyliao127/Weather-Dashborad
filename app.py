from flask import *
from dotenv import *
from datetime import *
import os
import requests

load_dotenv()
end_point=os.getenv("url")
app = Flask(__name__, static_folder="public")
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.json.ensure_ascii = False


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/message", methods=["POST"])
def botMessage():
    try:
        data = request.get_json()
        if data["PoP12h"][0] != "0":
            footer = {"text": "提醒您，降雨機率不為零，記得帶傘出門~🌧️"}
            ImgUrl = "https://truth.bahamut.com.tw/s01/201304/f6d9334f2931f137a724ed6f3d461b51.JPG"
        else:
            footer = {"text": "今日天氣良好，應多注意保暖或防曬🍞"}
            ImgUrl = "https://i2.kknews.cc/3A_iqiPPCpCndbHw6G4Ga96cJANcd8C7AQ/0.jpg"

        url=end_point
        Headers = {
            "Content-Type": "application/json",
        }
        orderInfo = {
            "username": "好不想上班_每日天氣預報",
            "avatar_url": "https://i1.kknews.cc/JE1yD4kP7X4RvzDfU8GQzbKnzdz_en572Tmsf2E/0.jpg",
            "content": "今日天氣預報資訊更新如下：",
            "url": "https://www.cwa.gov.tw/V8/C/W/County/County.html?CID=63",
            "embeds": [
                {
                    "type": "rich",
                    "title": "臺北市今日天氣預報",
                    "description": "<早上六點至晚上六點>",
                    "thumbnail": {
                        "url": "https://help.apple.com/assets/63FFF4F425D106794D09CC92/63FFF4F525D106794D09CC99/zh_TW/dc7f8cdb406dc7704cccb5188ddc28c1.png",
                        "height": 30,
                        "width": 30,
                    },
                    "color": 0x71BFEF,
                    "fields": [
                        {
                            "name": "🌋最高溫度",
                            "value": data["MaxT"][0] + "°C",
                            "inline": False,
                        },
                        {
                            "name": "🧊最低溫度",
                            "value": data["MinT"][0] + "°C",
                            "inline": False,
                        },
                        {
                            "name": "🌦️降雨機率",
                            "value": data["PoP12h"][0] + "%",
                            "inline": False,
                        },
                        {"name": "🧙‍♂️天氣現象", "value": data["Wx"][0], "inline": False},
                    ],
                    "image": {
                        "url": ImgUrl,
                        "height": 30,
                        "width": 30,
                    },
                    "footer": footer,
                }
            ],
        }

        requests.post(url, headers=Headers, json=orderInfo).json()
        return data
    except Exception as err:
        print(err)
        return data

app.run(host="0.0.0.0", port=3000, debug=True)
