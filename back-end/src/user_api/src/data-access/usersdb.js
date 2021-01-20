import constants from '../constants';
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

const uri = constants.dbUri;
const dbName = constants.dbName;
const dbCollection = constants.dbCollection;

export default function makeUsersDB(makeDB) {
    return Object.freeze({
        
    });

    function getMongoClient() {
        return new MongoClient(uri, { useUnifiedTopology: true }, {useNewUrlParser: true});
    }

    function getMongoCollection(client) {
        return client.db(dbName).collection(dbCollection);
    }
    
    async function insert({...userInfo}) {
        const client = await getMongoClient().connect();
        
        const result = await getMongoCollection(client).insertOne({...userInfo});
        client.close();
        
        return result.ops[0];
    }
    
    async function findById({id: _id}) {
        const client = await getMongoClient().connect();

        const result = await getMongoCollection(client).find({ _id: mongo.ObjectId(_id) }).toArray();
        client.close();

        if (result.length === 0) return null;
        return result[0];
    }
}