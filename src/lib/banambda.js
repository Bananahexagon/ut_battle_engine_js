"use strict"
const L = (() => {
    class Iter {
        constructor(array) {
            this.val = array;
            this.index = 0;
            this.len = array.length;
        }
        next() {
            if (this.index < this.len) {
                const arg = Some(this.val[this.index]);
                this.index++;
                return arg;
            }
            else {
                return None();
            }
        }
        loop(fn) {
            while (this.index < this.len) {
                fn(this.next().unwrap());
            }
        }
        collect() {
            return this.val;
        }
        map(fn) {
            return new MapIter(this.val, fn);
        }
        filter(fn) {
            return new FilterIter(this.val, fn);
        }
        fold(fn, init = None()) {
            let acc = init == None() ? this.next().unwrap() : init
            while (this.index < this.len) {
                acc = fn(acc, this.val.next.unwrap());
            }
            return acc;
        }
        enumerate() {
            let result = [];
            while (this.index < this.len) {
                result.push({ index: this.index, val: this.next().unwrap() });
            }
            return new Iter(result)
        }
    }

    class MapIter extends Iter {
        constructor(array, fn) {
            super(array);
            this.fn = fn;
        }
        collect() {
            let result = [];
            for (; this.index < this.len; this.index++) {
                result.push(this.fn(this.val[this.index]));
            }
            return result;
        }
    }

    class FilterIter extends Iter {
        constructor(array, fn) {
            super(array);
            this.fn = fn;
        }
        collect() {
            let result = [];
            for (; this.index < this.len; this.index++) {
                if (this.fn(this.val[this.index])) {
                    result.push(this.val[this.index]);
                }
            }
            return result;
        }
    }

    class Result {
        constructor(val, bool) {
            this.isOk = bool;
            this.val = val;
        }
        unwrap() {
            if (this.isOk) {
                return this.val;
            }
            else {
                throw new Error(this.val)
            }
        }
    }

    class Option {
        constructor(val, bool) {
            this.isSome = bool;
            this.val = val;
        }
        unwrap() {
            if (this.isSome) {
                return this.val;
            }
            else {
                throw new Error(this.val)
            }
        }
    }

    function Ok(val) {
        return new Result(val, true);
    }

    function Err(val = undefined) {
        return new Result(val, false);
    }

    function Some(val) {
        return new Option(val, true);
    }

    function None() {
        return new Option(undefined, false);
    }

    function iff(bool, truerun, falserun) {
        return bool ? truerun() : falserun();
    }

    function switchf(label, box) {
        return box[label] === undefined ?
            box.default()
            : box[label]()

    }

    const banambda = {
        Ok,
        Err,
        Some,
        None,
        Result,
        Option,
        Iter,
        MapIter,
        if: iff,
        switch: switchf,
    }
    return banambda;
})()