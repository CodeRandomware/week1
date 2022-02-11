import { MongoClient } from "mongodb";

// main
async function main() {
  const uri = "mongodb+srv://user:node123@cluster0.noses.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabase(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// Display data
async function listDatabase(client: MongoClient) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Database: ");
  databasesList.databases.forEach((data) => {
    console.log(`- ${data.name}`);
  });
}

// Create User
async function createUser(client: MongoClient, newListings) {
  client.db("user_demo").collection("week1_demo").insertMany(newListings)
}
