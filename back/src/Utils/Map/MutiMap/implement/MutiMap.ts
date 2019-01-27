import {MutiMapInterface} from '../interface/MutiMap';

export default class MutiMap<K, V> implements MutiMapInterface<K, V> {

    private dataMap = new Map<K,Set<V>>();

    private itemCount = 0;
    
    get(key: K): Set<V>{
        return this.dataMap.get(key);
    }

    add(key: K, value: V){
        let dataSet = this.dataMap.get(key);
        if(!dataSet){
            dataSet = new Set<V>();
            this.dataMap.set(key, dataSet);
        }
        dataSet.add(value);
        this.itemCount++;
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
                this.itemCount--;
                if(!dataSet.size){
                    this.dataMap.delete(key);
                }
            }
        }
    }

    deleteAll(key: K){
        const dataSet = this.dataMap.get(key);
        if(dataSet && this.dataMap.delete(key)){
            this.itemCount-=dataSet.size;
        }
        
    }

    has(key: K): boolean{
        return this.dataMap.has(key);
    }
    
    hasItem(key: K, value: V){
        const dataSet = this.dataMap.get(key);
        return dataSet && dataSet.has(value);
    }

    size(): number {
        return this.itemCount;
    }

    keySize(key:K): number{
        const dataSet = this.dataMap.get(key);
        return dataSet && dataSet.size || 0;
    }
}