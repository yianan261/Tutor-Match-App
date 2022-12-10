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
   * 2022/11/22: added schedule property
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
        pic: null,
        schedule: [],
        history: [],
      });
      return res;
    } catch (err) {
      alert(`This is an error ${err}`);
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
        projection: { user: 1, salt: 1, hash: 1, profile: 1 },
      };
      const res = await usersCol.findOne({ user: _email }, options);
      return res;
    } catch (err) {
      alert(`This is an error ${err}`);
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
      return res;
    } catch (err) {
      alert(`This is an error ${err}`);
    } finally {
      client.close();
    }
  };

  /**
   * Amanda
   * updates profile after the user edits the profile
   * @param {String} id
   * @param {Object} updatedProfile
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
    } catch (err) {
      alert(`This is an error ${err}`);
    } finally {
      client.close();
    }
  };

  /**
   * Amanda
   * updates profile pic
   * @param {String} id
   * @param {String} picPath
   * @returns
   */
  myDB.updatesPic = async (id, picPath) => {
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
            pic: picPath,
          },
        }
      );
      return res;
    } catch (err) {
      alert(`This is an error ${err}`);
    } finally {
      client.close();
    }
  };

  /**
   * Amanda Au-Yeung
   * delete user
   * @param {String} user_id
   * @returns
   */
  myDB.deleteUser = async (id) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.deleteOne({ _id: ObjectId(id) });
      return res;
    } catch (err) {
      alert(`This is an error ${err}`);
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
   * function that queries tutors when users type key word and also returns how many searches there are
   * @param {string} key search word
   * @param {int} page number (for pagination)
   * @returns array of objects of related searches and search size
   */
  myDB.findTutors = async (word, page = 0) => {
    let client;
    try {
      client = new MongoClient(url);
      const tutorsCol = client.db(DB_NAME).collection(TUTORS_COLLECTION);
      const query = {
        $or: [
          { first_name: { $regex: word, $options: "i" } },
          { subjects: { $regex: word, $options: "i" } },
          { last_name: { $regex: word, $options: "i" } },
        ],
      };
      const res = await tutorsCol
        .find(query)
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE)
        .toArray();
      const resSize = await tutorsCol.countDocuments(query);
      return [res, resSize];
    } finally {
      client.close();
    }
  };

  /**
   * Yian
   * function that gets user current schedule, also sorts history,
   * if the schedule date is a past date it will create a history property
   * @param {String} user ID
   * @returns updated user's schedule and doesn't return salt and hash information to client
   */
  myDB.getUserSchedule = async (_user) => {
    let client;
    let updateRes;
    try {
      client = new MongoClient(url);
      const userCol = client.db(DB_NAME).collection(USER_COLLECTION);
      const options = {
        projection: { salt: 0, hash: 0 },
      };
      const res = await userCol.findOne({ _id: ObjectId(_user) }, options);
      let historyDate = res.history;
      const todayDate = new Date();
      //move old bookings to history
      res.schedule.forEach((d) => {
        const newTemp = d.date.split("/").join("-");
        const currDate = new Date(newTemp);
        if (todayDate > currDate) {
          const newHistoryObj = {};
          //convert date object back to string
          const currTemp =
            ("0" + (currDate.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + currDate.getDate()).slice(-2) +
            "/" +
            currDate.getFullYear();
          newHistoryObj.date = currTemp;
          newHistoryObj.time = d.time;
          newHistoryObj.tutor = d.tutor;
          newHistoryObj.last_name = d.tutor_lastname;
          newHistoryObj.subject = d.subject;
          newHistoryObj.tutor_ID = d.tutor_ID;
          historyDate.push(newHistoryObj);
        }
      });
      //update schedule, old dates filtered out of schedule array
      //also deduplicates repeated objects in the schedule array
      const newSchedule = res.schedule.filter((item, idx) => {
        const _value = JSON.stringify(item);
        const newTemp = item.date.split("/").join("-");
        const currDate = new Date(newTemp);
        return (
          currDate > todayDate &&
          idx ===
            res.schedule.findIndex((obj) => {
              return JSON.stringify(obj) === _value;
            })
        );
      });
      //updates new schedule
      await userCol.updateOne(
        { _id: ObjectId(_user) },
        { $set: { schedule: newSchedule } }
      );

      //updates history
      await userCol.updateOne(
        { _id: ObjectId(_user) },
        { $set: { history: historyDate } }
      );

      updateRes = await userCol.findOne({ _id: ObjectId(_user) }, options);
      //return updated schedule
      return updateRes;
    } finally {
      client.close();
    }
  };

  /**Yian
   * Updates new bookings to "schedule" for user
   * @param {string} _user (ID)
   * @param {array} _booking
   */
  myDB.makeBooking = async (_user, _booking) => {
    let client;
    try {
      client = new MongoClient(url);
      const userCol = client.db(DB_NAME).collection(USER_COLLECTION);
      return await userCol.updateOne(
        { _id: ObjectId(_user) },
        { $push: { schedule: { $each: _booking } } }
      );
    } finally {
      client.close();
    }
  };

  /**Yian Chen
   * function that deletes user class booking
   * @param {object} _booking object
   * @returns
   */
  myDB.deleteBooking = async (_booking) => {
    let client;
    try {
      client = new MongoClient(url);
      const userCol = client.db(DB_NAME).collection(USER_COLLECTION);
      return await userCol.updateOne(
        { _id: ObjectId(_booking.user) },
        { $pull: { schedule: { date: _booking.date, time: _booking.time } } }
      );
    } finally {
      client.close();
    }
  };

  /**Yian Chen
   * function that lets users add reviews for tutors and updates tutor DB
   * @param {String} tutor first name
   * @param {String} tutor last name
   * @param {String} review
   * @returns
   */
  myDB.addReview = async (_tutor, _lastname, _review) => {
    let client;
    try {
      client = new MongoClient(url);
      const tutorCol = client.db(DB_NAME).collection(TUTORS_COLLECTION);
      return await tutorCol.updateOne(
        { first_name: _tutor, last_name: _lastname },
        { $push: { reviews: _review } }
      );
    } finally {
      client.close();
    }
  };
  return myDB;
}

export default MyMongoDB();
