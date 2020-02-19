const LRUCache = require("../index").LRUCache;
const runner = require("./TestSuite.test");

const assert = require("assert");

describe("LRU tests", () => {
    const values = [1, 2, 3, 4];

    runner(values, LRUCache);

    it("should prioritize nodes correctly based on update", () => {
        const cache = new LRUCache(values.length);
        values.forEach(v => cache.put(v, v));

        const reversedValues = values.slice().reverse();

        reversedValues.forEach(v => cache.put(v, v));

        const entries = cache.getEntries();
        assert.deepEqual(
            entries.map(en => en.key),
            values
        );
    });
});
