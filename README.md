# wx-accesstoken是什么
微信小程序,小游戏接口调用凭证管理工具

## 如何使用

```javascript
const redis = require("redis"),
    redisClient = redis.createClient(6379, '127.0.0.1'),
    WxAccessToken = require('wx-accesstoken'),
    wxAccessToken = new WxAccessToken(appId, secret, redisClient);

async xxx(){
    let token = await wxAccessToken.getAccessToken();
}
```

## 注意事项

* 如果您的项目是分布式的，请确保所有的进程使用相同的redis，否则将引起accesstoken提前过期。
* token在redis中的key为wx-applet-accesstoken-${this.appId}，您可以直接查看

## 联系方式

1677665056@qq.com

# End
