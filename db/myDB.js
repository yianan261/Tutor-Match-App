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
   * @param {String} hash from user
   * @param {String} salt from user
   * @param {String} displayName from user
   * @returns user
   */
  myDB.createUser = async (_user, _salt, _hash, displayName) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.insertOne({
        user: _user,
        salt: _salt,
        hash: _hash,
        profile: displayName,
      });
      return res;
    } finally {
      client.close();
    }
  };

  /**
   * Amanda
   * gets user from the registration form
   * @param {String} email
   * @returns the user email
   */
  myDB.getUsers = async (_email) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const options = {
        projection: { salt: 1, hash: 1, profile: 1 },
      };
      const res = await usersCol.findOne({ user: _email }, options);
      console.log("res in getUser by email", res);
      return res;
    } finally {
      client.close();
    }
  };
  /**
   * Amanda
   * gets user by id
   * @param {String} id
   * @returns the user id
   */
  myDB.getUsersById = async (id) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.findOne({ _id: ObjectId(id) });
      console.log("res in get user by ID ", res);
      return res;
    } finally {
      client.close();
    }
  };

  /**
   * Amanda
   * updates profile after the user edits the profile
   * @param {String} id 
   * @param {*} displayName 
   * @param {*} updatedProfile 
   * @returns 
   */
  myDB.updatesProfile = async (id, updatedProfile) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: {
            profile: updatedProfile,
          },
        }
      );
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

  /**
   * Yian
   * @param {String} user email
   * @returns user's schedule
   */
  myDB.getUserSchedule = async (_user) => {
    let client;
    try {
      client = new MongoClient(url);
      const userCol = client.db(DB_NAME).collection(USER_COLLECTION);
      const options = {
        projection: { salt: 0, hash: 0 },
      };
      return await userCol.findOne({ user: _user }, options);
    } finally {
      client.close();
    }
  };

  /**Yian
   * Updates new bookings to "schedule" for user, if "schedule" doesn't exist one will be created
   * @param {string} _user (ID)
   * @param {array} _booking
   */
  myDB.createBooking = async (_user, _booking) => {
    let client;
    try {
      console.log("show Booking DB", _booking);
      
      client = new MongoClient(url);
      const userCol = client.db(DB_NAME).collection(USER_COLLECTION);
      return await userCol.updateOne(
        { user: _user },
        { $push: { schedule: { $each: _booking } } }
      );
    } finally {
      client.close();
    }
  };
  return myDB;
}

export default MyMongoDB();
