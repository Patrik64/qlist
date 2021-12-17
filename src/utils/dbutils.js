import firebase from 'firebase/app'
import 'firebase/auth'

import { db } from '../firebase.qlist'

export async function dbSetQlist (ql) {
  const docID = ql.qlistId.toString()
  db.collection('qlist').doc(docID).set({
    ...ql
  }).catch((error) => { console.error('Error writing document to Firestore: ', error) })
}

export async function dbGetQlist (id) {
  const docRef = db.collection('qlist').doc(id)
  const ret = await docRef.get()
  return ret.data()
}

export async function dbDeleteQlist (id) {
  const docRef = db.collection('qlist').doc(id)
  await docRef.delete()
}

export async function dbGetAllQlists () {
  const snapshot = await db.collection('qlist').get()
  return snapshot.docs.map(doc => doc.data())
}

export async function dbQlistExists (id) {
  const docRef = db.collection('qlist').doc(id)
  const ret = await docRef.get()
  return ret.exists
}

export async function signIn () {
  const em = 'yet575@wwerf.sdf'
  const pw = 'RR66%%sdF#5532cc43'
  await firebase.auth().signInWithEmailAndPassword(em, pw).catch((err) => { console.log(err) })
}
