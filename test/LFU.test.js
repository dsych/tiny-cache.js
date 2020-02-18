const LFUCache = require("../index").LFUCache;
const runner = require("./TestSuite.test");

describe("LFU tests", () => {
    const values = [1, 2, 3, 4];

    runner(values, LFUCache);
});
