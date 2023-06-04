"use strict"

const P = (() => {
    async function map(collection, fn) {
        let promises = [];
        for (let i = 0; i < collection.length; i++) {
            promises.push(fn(collection[i]));
        }
        return Promise.all(promises);
    }

    async function map_force(collection, fn) {
        let promises = [];
        for (let i = 0; i < collection.length; i++) {
            promises.push(fn(collection[i]));
        }
        return Promise.allSettled(promises);
    }

    async function fold(collection, fn, init = undefined) {
        let i = 0;
        let acc = init !== undefined ? init : collection[i++];
        for (; i < collection.length; i++) {
            acc = await fn(acc, collection[i]);
        }
    }

    async function wrap(value) {
        return new Promise((resolve) => resolve(value));
    }

    const banamise = {
        wrap,
        map,
        map_force,
        fold,
    }

    return banamise;
})()