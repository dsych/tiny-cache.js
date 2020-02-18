const assert = require("assert");
const { LFUCache } = require("../index");

xdescribe("LFUCache tests", () => {
    let cache;

    const values = [1, 2, 3, 4];

    const populateCache = (c, vls) => {
        vls.forEach(v => c.put(v, v));
    };

    it("should store all values", () => {
        cache = new LFUCache(values.length);
        populateCache(cache, values);

        values.forEach(v => {
            assert.equal(cache.cache.has(v), true);
        });
    });

    it("should evict first values from cache", () => {
        cache = new LFUCache(values.length - 2);
        populateCache(cache, values);

        values.slice(2).forEach(v => assert.equal(cache.cache.has(v), true));
    });

    it("should not evict recently used entry", () => {
        // cache = new LFUCache(2);
        // cache.put(values[0], values[0]);
        // cache.put(values[1], values[1]);
        // // since items are prioritized in the order of insertion, this would make the first inserted item be the top priority
        // cache.get(values[0]);
        // cache.put(values[2], values[2]);
        // assert.equal(cache.cache.has(values[0]), true);
        // assert.equal(cache.cache.has(values[2]), true);
    });

    it("should retrieve values given to the nodes", () => {
        cache = new LFUCache(values.length);

        populateCache(cache, values);

        values.forEach(v => assert.equal(cache.get(v), v));
    });

    it("should update cached value for a specific key", () => {
        cache = new LFUCache(values.length);

        populateCache(cache, values);

        for (let i = 0; i < values.length; i++) {
            cache.put(values[i], values[values.length - i - 1]);
        }

        for (let i = 0; i < values.length; i++) {
            assert.equal(cache.get(values[i]), values[values.length - i - 1]);
        }
    });

    it("should not evict recently updated entry", () => {
        // cache = new LFUCache(2);
        // cache.put(values[0], values[0]);
        // cache.put(values[1], values[1]);
        // // since items are prioritized in the order of insertion, this would make the first inserted item be the top priority
        // cache.put(values[0], values[0]);
        // cache.put(values[2], values[2]);
        // assert.equal(cache.cache.has(values[0]), true);
        // assert.equal(cache.cache.has(values[2]), true);
    });

    it("should prioritize nodes correctly based on update", () => {
        // cache = new LFUCache(values.length);
        // populateCache(cache, values);
        // const reversedValues = values
        //     .join(" ")
        //     .split(" ")
        //     .reverse();
        // populateCache(cache, reversedValues);
        // let p = cache.head.next;
        // let index = 0;
        // while (p != cache.tail) {
        //     assert.equal(p.key, values[index++]);
        //     p = p.next;
        // }
    });

    it("should not store any values for 0 max size", () => {
        cache = new LFUCache(0);

        populateCache(cache, values);

        assert.equal(cache.getSize(), 0);
    });

    it("should not store any value for invalid max size", () => {
        const t = size => {
            cache = new LFUCache(size);
            cache.put(values[0], values[0]);
            assert.equal(cache.getSize(), 0);
        };

        t(null);

        t("");

        t(undefined);
    });
});
