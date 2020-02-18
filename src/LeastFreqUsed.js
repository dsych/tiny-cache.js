module.exports = class LFUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
    }

    put(key, value) {}

    get(key) {}

    getSize() {}

    getMaxCapacity() {
        return this.maxSize;
    }

    getEntries() {
        const rc = [];
        return rc;
    }
};
