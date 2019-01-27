import { Key } from "readline";

export  interface  MutiMapInterface<K, V> {

    get(key: K): Set<V>;

    add(key: K, value: V): void;

    deleteItem(key: K, value: V): void;

    deleteAll(key: K): void;

    has(key: K): boolean;
    
    hasItem(key: K, value:V): boolean;

    size(): number;

    keySize(key:K): number;
}