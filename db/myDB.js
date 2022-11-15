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
   * @param {int} object_id from user
   * @returns
   */
  myDB.createUser = async (id) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.insertOne(id);
      return res;
    } finally {
      client.close();
    }
  };

  /**
   * Yian
   * function that gets the info of specific tutor
   * @param {string} tutor_id
   * @returns one tutor object
   */
  myDB.getTutor = async (tutor_id) => {
    let client;
    try {
      client = new MongoClient(url);
      const tutorsCol = client.db(DB_NAME).collection(TUTORS_COLLECTION);
      return await tutorsCol.findOne({ _id: ObjectId(tutor_id) });
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
      console.log("word", word);
      client = new MongoClient(url);
      const tutorsCol = client.db(DB_NAME).collection(TUTORS_COLLECTION);
      // const options = { projection: { reviews: 0 } };
      const res = await tutorsCol
        .find({
          $or: [
            { first_name: { $regex: word, $options: "i" } },
            { subjects: { $regex: word, $options: "i" } },
            { last_name: { $regex: word, $options: "i" } },
          ],
        })
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE)
        .toArray();

      return res;
    } finally {
      client.close();
    }
  };

  return myDB;
}

export default MyMongoDB();
