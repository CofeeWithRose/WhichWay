export  interface  MutiMapInterface<K, V> {

    get(key: K): Set<V>;

    set(key: K, value: V): void;

    deleteItem(key: K, value: V): void;

    deleteAll(key: K): void;

    has(key: K): boolean;
    
}