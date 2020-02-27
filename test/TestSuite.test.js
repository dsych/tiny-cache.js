const assert = require("assert");

module.exports = (values, Cache, config) => {
    let cache;

    const populateCache = (c, vls) => {
        vls.forEach(v => c.put(v, v));
    };

    const getReversedValues = v => v.slice().reverse();

    const isEnabled = num => !config || config.size == 0 || config.has(num);

    if (isEnabled(1)) {
        it("should store all values", () => {
            cache = new Cache(values.length);
            populateCache(cache, values);

            assert.deepEqual(
                cache
                    .getEntries()
                    .map(el => el.key)
                    .sort(),
                values.sort()
            );
        });
    }
    if (isEnabled(2)) {
        it("should evict first values from cache", () => {
            cache = new Cache(values.length - 2);
            populateCache(cache, values);

            assert.deepEqual(
                cache
                    .getEntries()
                    .map(el => el.key)
                    .sort(),
                getReversedValues(values.slice(2)).sort()
            );
        });
    }
    if (isEnabled(3)) {
        it("should not evict recently used entry", () => {
            cache = new Cache(2);

            cache.put(values[0], values[0]);
            cache.put(values[1], values[1]);

            // since items are prioritized in the order of insertion, this would make the first inserted item be the top priority
            cache.get(values[0]);

            cache.put(values[2], values[2]);

            const entries = cache.getEntries();
            assert.equal(entries.filter(el => el.key === values[0]).length, 1);
            assert.equal(entries.filter(el => el.key === values[2]).length, 1);
        });
    }
    if (isEnabled(4)) {
        it("should retrieve values given to the nodes", () => {
            cache = new Cache(values.length);

            populateCache(cache, values);

            values.forEach(v => assert.equal(cache.get(v), v));
        });
    }
    if (isEnabled(5)) {
        it("should update cached value for a specific key", () => {
            cache = new Cache(values.length);

            populateCache(cache, values);

            for (let i = 0; i < values.length; i++) {
                cache.put(values[i], values[values.length - i - 1]);
            }

            for (let i = 0; i < values.length; i++) {
                assert.equal(
                    cache.get(values[i]),
                    values[values.length - i - 1]
                );
            }
        });
    }
    if (isEnabled(6)) {
        it("should not evict recently updated entry", () => {
            cache = new Cache(2);

            cache.put(values[0], values[0]);
            cache.put(values[1], values[1]);

            // since items are prioritized in the order of insertion, this would make the first inserted item be the top priority
            cache.put(values[0], values[0]);

            cache.put(values[2], values[2]);
            const entries = cache.getEntries();

            assert.equal(entries.filter(el => el.key === values[0]).length, 1);
            assert.equal(entries.filter(el => el.key === values[2]).length, 1);
        });
    }
    if (isEnabled(7)) {
        it("should not store any values for 0 max size", () => {
            cache = new Cache(0);

            populateCache(cache, values);

            assert.equal(cache.getSize(), 0);
        });
    }
    if (isEnabled(8)) {
        it("should not store any value for invalid max size", () => {
            const t = size => {
                cache = new Cache(size);
                cache.put(values[0], values[0]);
                assert.equal(cache.getSize(), 0);
            };

            t(null);

            t("");

            t(undefined);
        });
    }
};
