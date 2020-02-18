const LRUCache = require("../index").LRUCache;
const runner = require("./TestSuite.test");

xdescribe("LRU tests", () => {
    const values = [1, 2, 3, 4];

    runner(values, LRUCache);
});
