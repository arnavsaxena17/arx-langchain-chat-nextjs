console.log("This is the environment variable for mongo", process.env.MONGO_PROD);
import { MongoClient, MongoClientOptions } from 'mongodb';

interface CustomMongoClientOptions extends MongoClientOptions {
    useUnifiedTopology?: boolean;
}

const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD : process.env.MONGO_DEV;

export async function createClient () {
    let client = new MongoClient(uri, { useUnifiedTopology: true } as CustomMongoClientOptions);
    return client;
}

export async function connectToDatabase() {
    const client = await createClient();
    await client.connect();
    const db = client.db('users'); // Assumes your database is named 'users'
    return { client, db };
}

export async function disconnectFromDatabase(client : MongoClient) {
    await client.close();
}

// export async function insertUser() {
//     const { db, client } = await connectToDatabase();
//     const collection = db.collection('test-users');
//     const insertResult = await collection.insertOne({ name: 'John Doe', age: 30 });
//     return insertResult;
// }

// export async function findUser() {
//     const { db, client } = await connectToDatabase();
//     const collection = db.collection('test-users');
//     const findResult = await collection.findOne({ name: 'John Doe' });
//     return findResult;
// }

// export async function updateUser() {
//     const { db, client } = await connectToDatabase();
//     const collection = db.collection('test-users');
//     const updateResult = await collection.updateOne({ name: 'John Doe' }, { $set: { age: 31 } });
//     return updateResult;
// }

// export async function deleteUser() {
//     const { db, client } = await connectToDatabase();
//     const collection = db.collection('test-users');
//     const deleteResult = await collection.deleteOne({ name: 'John Doe' });
//     return deleteResult;
// }

// export async function main() {
//     const insertResult = await insertUser();
//     console.log('Inserted user:', insertResult);
//     const findResult = await findUser();
//     console.log('Found user:', findResult);
//     const updateResult = await updateUser();
//     console.log('Updated user:', updateResult);
//     const deleteResult = await deleteUser();
//     console.log('Deleted user:', deleteResult);
// }