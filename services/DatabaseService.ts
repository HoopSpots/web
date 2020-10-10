import {openDB} from "idb";

const dbName = 'hoop_spots_schema';

interface DBMethods {
    get(key: string): any;
    set(key: string, val: any): any;
    delete(key: string): any;
    clear(): any;
    keys(): any;
}

class DatabaseService {
    public database: DBMethods;

    constructor() {

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

export default DatabaseService;
