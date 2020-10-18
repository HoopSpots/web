import {openDB} from "idb";

const dbName = 'hoop_spots_schema';

export interface DBMethods {
    get(key: string): Promise<any>;
    set(key: string, val: any): Promise<any>;
    delete(key: string): Promise<any>;
    clear(): Promise<any>;
    keys(): Promise<any>;
}

class DatabaseService {
    public database: DBMethods;

    constructor() {
        if (typeof window !== 'undefined') {
            const dbPromise = openDB('hoop_spots', 1, {
                upgrade(db) {
                    db.createObjectStore(dbName);
                },
            });

            this.database  = {
                async get(key: string) {
                    return (await dbPromise).get(dbName, key);
                },
                async set(key: string, val: any) {
                    return (await dbPromise).put(dbName, val, key);
                },
                async delete(key: string) {
                    return (await dbPromise).delete(dbName, key);
                },
                async clear() {
                    return (await dbPromise).clear(dbName);
                },
                async keys() {
                    return (await dbPromise).getAllKeys(dbName);
                },
            };
        }
    }
}

export default DatabaseService;
