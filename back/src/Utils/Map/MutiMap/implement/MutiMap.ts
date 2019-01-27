import {MutiMapInterface} from '../interface/MutiMap';

export default class MutiMap<K, V> implements MutiMapInterface<K, V> {
    private dataMap = new Map<K,Set<V>>();
    get(key: K): Set<V>{
        return this.dataMap.get(key);
    }

    set(key: K, value: V){
        let dataSet = this.dataMap.get(key);
        if(!dataSet){
            dataSet = new Set<V>();
            this.dataMap.set(key, dataSet);
        }
        dataSet.add(value);
    }

    /**
     * 删除一个元素.
     * @param key 
     * @param value 
     */
    deleteItem(key: K, value: V){
        const dataSet = this.dataMap.get(key);
        if(dataSet){
            if( dataSet.delete(value) ){
                if(!dataSet.size){
                    this.dataMap.delete(key);
                }
            }
        }
    }

    deleteAll(key: K){
        this.dataMap.delete(key);
    }

    has(key: K): boolean{
        return this.dataMap.has(key);
    }
    
}