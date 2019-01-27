import MutiMapInterface from '../interface/MutiMap';

export default class MutiMap<K, V> implements MutiMapInterface<K, V> {
    private dataMap = new Map<K,Array<V>>();
    get(key: K): Array<V>{
        return this.dataMap.get(key);
    }

    set(key: K, value: V){
        let dataArray = this.dataMap.get(key);
        if(!dataArray){
            dataArray = [];
            this.dataMap.set(key, dataArray);
        }
        dataArray.push(value);
    }

    /**
     * 删除一个元素.
     * @param key 
     * @param value 
     */
    deleteItem(key: K, value: V){
        const dataArray = this.dataMap.get(key);
        if(dataArray){
            const dataIndex = dataArray.indexOf(value);
            if( dataIndex > -1 ){
                dataArray.splice(dataIndex, 1);
                if(!dataArray.length){
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