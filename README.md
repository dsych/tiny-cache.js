# TinyCache.js ![build-status](https://travis-ci.com/dsych/tiny-cache.js.svg?branch=master)

This is a collection of different caching algorithms that could be used both in **browser** and on a **server**.

## Why?

Mostly because I wanted to play around with different caching policies and understand them better.

Also got inspired by [this LeetCode problem](https://leetcode.com/problems/lru-cache/).

## What's inside?

Here is the list of all supported policies:

-   _Least Recently Used (**LRU**) cache_ - items are evicted based on when they were accessed last, [Wiki](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>).
-   _Least Frequently Used (**LFU**) cache_ - items are evicted based on how many times they were accessed. The lesser accessed items are removed first, [Wiki](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least-frequently_used_(LFU)>).
-   _Timed Cache_ - items are evicted after a set period of time has elapsed.

## How to use it?

1. Install the npm module.
2. Import it in your project:
    > const caches = require("tiny-cache");
3. The `caches` variable from above now contains references to all caching strategies that you can instantiate as classes e.g.

```js
const caches = require("tiny-cache");

// LRU cache, pass the max number of items
const lru = new caches.LRUCache(12);

// LFU cache, pass the max number of items
const lfu = new caches.LFUCache(12);

// Times cache, pass the lifespan of an item in milliseconds
const timed = new caches.TimeCache(5000); // 5 seconds
```

4. Populate cache and access items stored.
   Methods:

-   `get` - get previously stored value
-   `put` - create or update an old value
-   `getSize` - get current cache size
-   `getMaxCapacity` - get maximum capacity of the cache
-   `getEntries` - get all entries in the form `[{key: "", value: some-val}]`

```js
const lru = new caches.LRUCache(2);
lru.put("hello", "world");
lru.put("foo", "bar");

console.log(lru.get("hello")); // prints "world"

lru.put("test", "val"); // since capacity is reached, some item is evicted

console.log(lru.get("foo")); // null is returned, since this item was evicted
console.log(lru.get("test")); // prints "val"
```
