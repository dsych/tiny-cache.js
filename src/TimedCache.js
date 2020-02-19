class Node {
    constructor(key, value, expires) {
        this.key = key;
        this.value = value;
        this.expires = expires;
    }
}

module.exports = class TimedCache {
    constructor(lifespan) {
        this.lifespan = +lifespan;
        if (isNaN(this.lifespan)) {
            this.lifespan = 0;
        }
        this.cache = new Map();
        this.interval = -1;
        // no reason to run eviction, if there will be no items
        if (this.lifespan > 0) {
            this.interval = setInterval(this.evict.bind(this), this.lifespan * 2);
        }
    }

    evict() {
        const now = +new Date();
        this.cache.forEach(v => {
            if (v.expires <= now) {
                this.cache.delete(v.key);
            }
        });
    }

    put(key, value) {
        if (this.lifespan <= 0) {
            return;
        }
        let node = this.cache.get(key);
        if (!node) {
            const now = +new Date();
            node = new Node(key, value, now);
        } else {
            node.value = value;
        }
        this.cache.set(key, node);
    }

    get(key) {
        const node = this.cache.get(key);
        const now = +new Date();
        if (!node || node.expires <= now) {
            return null;
        }
        return node.value;
    }

    getSize() {
        return this.cache.size;
    }

    getLifespan() {
        return this.lifespan;
    }

    getEntries() {
        const rc = [];
        this.cache.forEach(node => {
            rc.push({ key: node.key, value: node.value });
        });

        return rc;
    }

    release() {
        if (this.interval >= 0) {
            clearInterval(this.interval);
        }
    }
};
