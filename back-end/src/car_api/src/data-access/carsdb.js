import constants from '../constants';
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

const uri = constants.dbUri;
const dbName = constants.dbName;
const dbCollection = constants.dbCollection;

export default function makeCarsDb (makeDB) {
    return Object.freeze({
        findAll,
        insert,
        update,
        remove,
        findById,
        findCarsByOwner        
    });
    
    function getMongoClient() {
        return new MongoClient(uri, { useUnifiedTopology: true }, {useNewUrlParser: true});
    }
    
    function getMongoCollection(client) {
        return client.db(dbName).collection(dbCollection);
    }
    
    async function findAll() {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).find().toArray();
        client.close();
        
        return result.map(({ _id: id, ...found }) => ({
            id,
            ...found,
        }));
    }
    
    async function insert({...carInfo}) {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).insertOne({...carInfo});
        client.close();
        
        return result.ops[0];
    }
    
    async function update({id: _id, ...carInfo}) {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).updateOne({ _id: mongo.ObjectId(_id) }, { $set: { ...carInfo } });
        client.close();
        
        return result.modifiedCount > 0 ? { id: _id, ...carInfo } : null;
    }
    
    async function remove({id: _id}) {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).deleteOne({ _id: mongo.ObjectId(_id) });
        client.close();
        
        return result.deletedCount;
    }
    
    async function findById({id: _id}) {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).find({ _id: mongo.ObjectId(_id) }).toArray();
        client.close();
        
        if (result.length === 0) return null;
        return result[0];
    }
    
    async function findCarsByOwner({...owner}) {
        const client = await getMongoClient().connect();
        const result = await getMongoCollection(client).find(owner).toArray();
        client.close();

        return result.map(({ _id: id, ...found }) => ({
            id,
            ...found,
        }));
    }
}