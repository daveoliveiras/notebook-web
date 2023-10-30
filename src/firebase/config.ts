import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAs1aWBE7-CkcSNi8AeEFfK8dVTwLmRLrY',
  authDomain: 'notebooks-react-4e7f6.firebaseapp.com',
  projectId: 'notebooks-react-4e7f6',
  storageBucket: 'notebooks-react-4e7f6.appspot.com',
  messagingSenderId: '118883541441',
  appId: '1:118883541441:web:9828c4a56ef0eb0c920f40'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

auth.languageCode = 'pt'

export { auth, provider, signInWithPopup }