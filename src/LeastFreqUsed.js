class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.frequency = 0;
    }
}

module.exports = class LFUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
        this.counts = [new Set()];
    }

    put(key, value) {
        let node = this.cache.get(key);

        if (!node) {
            node = new Node(key, value);
        }
        this.counts[node.frequency].delete(node.key);
        // move current node to the higher frequency
        node.frequency++;

        // need to grow the frequency array, since new count has not been reached, yet
        if (this.counts.length <= node.frequency) {
            this.counts.push(new Set());
        }

        this.counts[node.frequency].add(node.key);
        this.cache.set(key, node);
    }

    get(key) {
        let node = this.cache.get(key);
        if (node) {
            // value is found, we need to increase the frequency of that key

            this.counts[node.frequency].delete(node.key);
            // move current node to the higher frequency
            node.frequency++;

            // need to grow the frequency array, since new count has not been reached, yet
            if (this.counts.length <= node.frequency) {
                this.counts.push(new Set());
            }

            this.counts[node.frequency].add(node.key);

            node = { key: node.key, value: node.value };
        } else {
            node = null;
        }

        return node;
    }

    getSize() {
        return this.cache.size;
    }

    getMaxCapacity() {
        return this.maxSize;
    }

    getEntries() {
        const rc = [];
        this.counts.forEach(s => {
            s.forEach(k => {
                const node = this.cache.get(k);
                rc.push({ key: node.key, value: node.value });
            });
        });

        return rc;
    }
};
