import { initializeApp } from 'firebase/app';
import { getDatabase, ref} from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAz0n-ON2d4edo5vvTUF5_dEnCDeo-2TA4",
    authDomain: "mancity-7f923.firebaseapp.com",
    databaseURL: "https://mancity-7f923-default-rtdb.firebaseio.com",
    projectId: "mancity-7f923",
    storageBucket: "mancity-7f923.appspot.com",
    messagingSenderId: "389712433381",
    appId: "1:389712433381:web:0656b7806623810ad3c40c",
    measurementId: "G-KCCHX8EXV4"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);
  const storage = getStorage(firebaseApp)
  const firebasePromotions = ref(database, 'promotions');
 
  const firebaseMatches = ref(database, 'matches')
  const firebaseTeams = ref(database, 'teams')
  const firebasePlayers = ref(database, 'players')
  export {
    firebaseApp,
    database,
    firebasePromotions,
    firebasePlayers,
    firebaseMatches,
    firebaseTeams,
    storage
  }

// function fetchDataFromRealtimeDatabase() {
//   const databaseRef = ref(database, 'matches');
//   onValue(databaseRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   });
// }
// fetchDataFromRealtimeDatabase();
  