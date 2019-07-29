import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";
import "firebase/database";
const POSTS = "posts";
const PORTFOLIOS = "portfolios";

const firestore = firebase.firestore();

export default {
  getPosts() {
    const postsCollection = firestore.collection(POSTS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          return data;
        });
      });
  },
  postPost(title, body) {
    return firestore.collection(POSTS).add({
      title,
      body,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.id = doc.id;
          return data;
        });
      });
  },
  getPortfolioById(id) {
    const postsCollection = firestore.collection(PORTFOLIOS).doc(id);
    return postsCollection.get().then(docSnapshots => {
      let data = docSnapshots.data();
      data.created_at = new Date(data.created_at.toDate());
      data.id = docSnapshots.id;
      return data;
    });
  },
  postPortfolio(title, body, img) {
    return firestore
      .collection(PORTFOLIOS)
      .add({
        title,
        body,
        img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        return "success";
      })
      .catch(function(error) {
        return error.code;
      });
  }
};
