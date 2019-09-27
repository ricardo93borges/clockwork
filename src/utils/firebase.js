import * as firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBJ8eFFZ6ngXbjzBNOrzklvwpxb6Ri_elQ',
  authDomain: 'clockwork-3567d.firebaseapp.com',
  databaseURL: 'https://clockwork-3567d.firebaseio.com',
  projectId: 'clockwork-3567d',
  storageBucket: 'clockwork-3567d.appspot.com',
  messagingSenderId: '397956066617',
  appId: '1:397956066617:web:2a0bc0499492ea04eecce8',
  measurementId: 'G-E1BW32CDW6'
}

firebase.initializeApp(config)

export const database = firebase.firestore()
