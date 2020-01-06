const mocha = require('mocha');
const assert = require("assert");

const redis = require("redis"),
    conf = require('./conf.json'),
    redisClient = redis.createClient(6379, '127.0.0.1'),
    Auth = require('../lib'),
    auth = new Auth(conf.appId, conf.secret, redisClient);

describe('testAuth', () => {
    
    it('accessToken', async () => {
        let accessToken = await auth.getAccessToken();
        console.log(accessToken);
        assert(accessToken != null, 'token is null');
    });

    it('getNewAccessToken', async () => {
        let accessToken = await auth.getNewAccessToken();
        console.log(accessToken);
        assert(accessToken != null, 'token is null');        
    })

});