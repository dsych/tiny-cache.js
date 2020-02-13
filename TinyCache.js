class Node {
    constructor(k, v) {
        this.value = v;
        this.key = k;
        this.next = null;
        this.prev = null;
    }
}

module.exports = class LRUCache {
    constructor(maxSize) {
        this.maxSize = +maxSize;
        // if unable to parse the maxSize, default to 0
        if (isNaN(this.maxSize)) {
            this.maxSize = 0;
        }
        this.cache = new Map();

        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    put(key, value) {
        // no need to do anything when max capacity is 0
        if (this.maxSize <= 0) {
            return;
        }

        let node = this.cache.get(key);
        if (!node) {
            if (this.cache.size >= this.maxSize) {
                // we are at capacity, thus evict the least used node
                this.cache.delete(this.tail.prev.value);
                this.tail.prev.next = this.tail;
            }
            // construct the new node
            node = new Node(key, value);
        } else {
            // update the value of existing node
            node.value = value;
            // extract the current node for the list
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }

        // place node at the top of the linked list
        // reset reference of the head's next node
        this.head.next.prev = node;
        node.next = this.head.next;

        // reset references of the head
        this.head.next = node;
        node.prev = this.head;

        // add node to the cache
        this.cache.set(key, node);
    }

    get(key) {
        const node = this.cache.get(key);
        if (node) {
            // link prev and next of the target node together
            const oldPrev = node.prev;
            const oldNext = node.next;

            oldPrev.next = oldNext;
            oldNext.prev = oldPrev;

            // place node at the top of the linked list
            // reset reference of the head's next node
            this.head.next.prev = node;
            node.next = this.head.next;

            // reset references of the head
            this.head.next = node;
            node.prev = this.head;

            return node.value;
        } else {
            return null;
        }
    }

    getSize() {
        return this.cache.size;
    }

    getMaxCapacity() {
        return this.maxSize;
    }
};
