const TimedCache = require("../index").TimedCache;
const assert = require("assert");
const setTimeoutPromised = require("util").promisify(setTimeout);

describe("Timed Cache tests", () => {
    let cache;

    const values = [1, 2, 3, 4];

    afterEach(() => {
        if (cache) {
            cache.release();
        }
    });

    it("should store all entries", () => {
        cache = new TimedCache(100000);

        values.forEach(v => cache.put(v, v));

        values.forEach(v => assert.equal(cache.get(v), v));
    });

    it("should expire all entries", () => {
        cache = new TimedCache(100);

        values.forEach(v => cache.put(v, v));

        return setTimeoutPromised(400).then(() => {
            values.forEach(v => assert.equal(cache.get(v), null));
        });
    });

    it("should not return expired entries even though that were not removed, yet", () => {
        cache = new TimedCache(400);

        values.forEach(v => cache.put(v, v));

        return setTimeoutPromised(500).then(() => {
            values.forEach(v => assert.equal(cache.get(v), null));
        });
    });

    it("should not initialize cache with for invalid lifespans", () => {
        cache = new TimedCache(null);
        cache = new TimedCache(undefined);
        cache = new TimedCache("");
        cache = new TimedCache(0);
        cache = new TimedCache(-1);
    });
});
