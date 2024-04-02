const redis = require('redis');

class Redis {
    constructor() {
        this.redis = redis.createClient({}).connect();
    }

    async _set(key, value) {
        return new Promise(async (resolve, reject) => {
            (await this.redis).set(key, JSON.stringify(value)).then(() => {
                resolve({ success: true })
            }).catch((err) => {
                reject({ success: false, error: err });
            })
        })
    }

    async setEx(key, expiration, value) {
        return new Promise(async (resolve, reject) => {
            (await this.redis).setEx(key, expiration, JSON.stringify(value)).then(() => {
                resolve({ success: true })
            }).catch((err) => {
                reject({ success: false, err });
            })
        })
    }

    async get(key) {
        return new Promise(async (resolve, reject) => {
            (await this.redis).get(key).then((val) => {
                if (val) {
                    resolve({  success: true, val: JSON.parse(val)});
                } else {
                    resolve({ success: false, val: [] });
                }
            }).catch((err) => {
                reject({ success: false, err });
            })
        })
    }
    
    async flushAll() {
        (await this.redis).flushAll()
    }

    async lpush(key, values) {
        return new Promise(async (resolve, reject) => {
            try {
                if (values.length) {
                    for (let i = 0; i < values.length; i++) {
                        (await this.redis).lPush(key, JSON.stringify(values[i]))
                    }
                }
                resolve({ success: true })
            } catch (error) {
                reject({ success: false, error });
            }
        })
    }
}

const instance = new Redis();
module.exports = instance;