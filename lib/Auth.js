const requestUtil = require("./requestUtil");
const Cache = require('./Cache');
/**
 * 登录
 */
function Auth(appId, secret, redisClient) {
    this.appId = appId;
    this.secret = secret;
    this.cache = new Cache(redisClient);
}

Auth.prototype.getAccessToken = async function () {
    let cachedAccessToken = await this.cache.getCache(`wx-applet-accesstoken-${this.appId}`);
    if (cachedAccessToken) {
        return cachedAccessToken;
    }
    return this.getNewAccessToken();
}

Auth.prototype.getNewAccessToken = async function () {
    let response = await requestUtil.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.secret}`),
        json = await response.json();
    if (json.errcode) {
        throw new Error(`error occured with wx,${json.errcode} ${json.errmsg}`);
    }
    let accessToken = json.access_token;
    this.cache.setCache(`wx-applet-accesstoken-${this.appId}`, accessToken, (json.expires_in) * 1000);
    return accessToken;
}

module.exports = Auth;