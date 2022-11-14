import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//Yian + Amanda
/**
 * MyMongoDB module funciton has authenticate, get, and create functionalities for the DB
 * @returns myDB object contianing the functions
 */
function MyMongoDB() {
  const myDB = {};
  const url = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "TutorsApp";
  const USER_COLLECTION = "users";
  const TUTORS_COLLECTION = "tutors";
  const PAGE_SIZE = 18;

  /**
   * Amanda
   * function that creates user
   * @param {String} user from user
   * @returns user
   */
  myDB.createUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.insertOne(user);
      return res;
    } finally {
      client.close();
    }
  };

  /**
   * Amanda
   * @param {String} email 
   * @returns the user email
   */
  myDB.getUsers = async (_email) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const query = {email: _email};
      const options = {
        projection: {password: 0, confirmed_pw: 0}
      };
      const res = await usersCol.findOne(query, options);
      return res;
    } finally {
      client.close();
    }
  };


  /** Yian
   * function that queries tutors when users type key word
   * @param {string} key search word
   * @param {int} page number (for pagination)
   * @returns array of objects of related searches
   */
  myDB.findTutors = async (word, page = 0) => {
    let client;
    try {
      client = new MongoClient(url);
      const tutorsCol = client.db(DB_NAME).collection(TUTORS_COLLECTION);
      const options = { projection: { reviews: 0 } };
      return await tutorsCol
        .find(
          {
            $or: [
              { first_name: { $regex: word, $options: "i" } },
              { subjects: { $regex: word, $options: "i" } },
              { education: { $regex: word, $options: "i" } },
              { last_name: { $regex: word, $options: "i" } },
              { gender: { $regex: word, $options: "i" } },
            ],
          },
          options
        )
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE)
        .toArray();
    } finally {
      client.close();
    }
  };

  return myDB;
}

export default MyMongoDB();
