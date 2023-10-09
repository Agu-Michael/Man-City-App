import React, { Component } from 'react';
import { database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import MatchesBlock from '../../ui/matches_block';
import Slide from 'react-reveal'

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSixData: [],
    };
  }

  componentDidMount() {
    const firebaseRef = ref(database, 'matches');
    const limit = 6;

    onValue(firebaseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.values(data);
        const lastSix = dataArray.slice(-limit);
        this.setState({ lastSixData: lastSix });
      }
    });
  }

  showMatches = () => {
    const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it
    return reversedData.map((match, index) => ( // Map over the reversed array
    <Slide bottom key={match.id}>
        <div  className='item'>
        <div className='wrapper'>
         
          <MatchesBlock key={index} match={match} />
        </div>
      </div>

    </Slide>
      
    ));
  };

  render() {
    console.group('matches'); // Start a new console group with the label "matches"

    this.state.lastSixData.forEach((match) => {
      console.log(match);
    });

    console.groupEnd(); // End the console group

    return (
      <div className='home_matches'>
        {/* Call the showMatches function */}
        {this.showMatches()}
      </div>
    );
  }
}

export default Blocks;
























// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import MatchesBlock from '../../ui/matches_block';

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lastSixData: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ lastSixData: lastSix });
//       }
//     });
//   }

//   showMatches = () => {
//     return this.state.lastSixData.map((match, index) => (
//       <div key={match.id} className='item'>
//         <div className='wrapper'>
//           {/* Pass the 'match' object to the MatchesBlock component */}
//           <MatchesBlock key={index} match={match} />
//         </div>
//       </div>
//     ));
//   };

//   render() {
//     const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it

//     console.group('matches'); // Start a new console group with the label "matches"

//     reversedData.forEach((match) => {
//       console.log(match);
//     });

//     console.groupEnd(); // End the console group

//     return (
//       <div className='home_matches'>
//         {/* Call the showMatches function */}
//         {this.showMatches()}
//       </div>
//     );
//   }
// }

// export default Blocks;





























// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import MatchesBlock from '../../ui/matches_block'; // Import the reusable functional component

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lastSixData: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ lastSixData: lastSix });
//       }
//     });
//   }

//   showMatches = () => {
//     return this.state.lastSixData.map((match, index) => (
//       <div key={match.id} className='item'>   
//         <div className='wrapper'>
//         <MatchesBlock key={index} /> 
//         </div>
//         {/* Render the reusable component MatchesBlock */}
        
//       </div>
//     ));
//   };

//   render() {
//     const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it

//     console.group('matches'); // Start a new console group with the label "matches"

//     reversedData.forEach((match) => {
//       console.log(match);
//     });

//     console.groupEnd(); // End the console group

//     return (
//       <div className='home_matches'>
//         {/* Call the showMatches function */}
//         {this.showMatches()}
//       </div>
//     );
//   }
// }

// export default Blocks;

























// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import MatchesBlock from '../../ui/matches_block'; // Import the reusable functional component

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lastSixData: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ lastSixData: lastSix });
//       }
//     });
//   }

//   showMatches = () => {
//     const reversedData = this.state.lastSixData.slice().reverse();
//     return this.state.lastSixData.map((match, i) => (
//       <div key={match.id} className='item'>
//         {/* Render the reusable component MatchesBlock */}
//         <div className='wrapper'>
//           {reversedData.forEach((match) =>{
//             return(
//               <MatchesBlock key={i} match={match} />
//             )
//           })}
      
          
//         </div>

//       </div>
//     ));
//   };

//   render() {
//     const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it

//     console.group('matches'); // Start a new console group with the label "matches"

//     reversedData.forEach((match) => {
//       console.log(match);
//     });

//     console.groupEnd(); // End the console group

//     return (
//       <div className='home_matches'>
//         {/* Call the showMatches function */}
//         {this.showMatches()}
//       </div>
//     );
//   }
// }

// export default Blocks;



















// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lastSixData: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ lastSixData: lastSix });
//       }
//     });
//   }

//   showMatches = () => {
//     return this.state.lastSixData.map((match) => (
//       <div key={match.id}>
//         {/* Render the data from the lastSixData array here */}
//       </div>
//     ));
//   };

//   render() {
//     const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it

//     console.group('matches'); // Start a new console group with the label "matches"

//     reversedData.forEach((match) => {
//       console.log(match);
//     });

//     console.groupEnd(); // End the console group

//     return (
//       <div className='home_matches'>
//         {this.showMatches()}
//       </div>
//     );
//   }
// }

// export default Blocks;













































// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import  MatchesBlock  from '../../ui/matches_block'

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lastSixData: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ lastSixData: lastSix });
//       }
//     });
//   }

//   render() {
//     const reversedData = this.state.lastSixData.slice().reverse(); // Make a copy of the array and reverse it

//     console.group('matches'); // Start a new console group with the label "matches"

//     reversedData.forEach((match) => {
//       console.log(match);
//     });

//     console.groupEnd(); // End the console group

//     return (
//       <div className='home_matches'>
//         {reversedData.map((match) => (
//           <div key={match.id}>
           
//             {/* Render the data from the reversedData array here */}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default Blocks;















// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';

// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       matches: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ matches: lastSix });
//       }
//     });
//   }

//   render() {
//     const reversedData = this.state.matches.slice().reverse(); // Make a copy of the array and reverse it

//     console.log(reversedData);

//     return (
//       <div className='home_matches'>
//         {reversedData.map((match) => (
//           <div key={match.id}>
//             {/* Render the data from the reversedData array here */}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default Blocks;


// import React, { Component } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import { reverseArray } from '../../ui/misc';
// class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {  
//       matches: [],
//     };
//   }

//   componentDidMount() {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         this.setState({ matches: lastSix });
//       }
//     });
   
//   }

//   render() {
//     console.log(this.state.matches);

//     return (
//       <div className='home_matches'>
//         {this.state.matches.map((match) => (
//           <div key={match.id}>
//             {/* Render the data from the lastSixData array here */}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default Blocks;









































// import React, { useState, useEffect } from 'react';
// import { database } from '../../../firebase';
// import { ref, onValue } from 'firebase/database';
// import { reverseArray } from '../../ui/misc';

// const Blocks = () => {
//   const [matches, setLastSixData] = useState([]);

//   useEffect(() => {
//     const firebaseRef = ref(database, 'matches');
//     const limit = 6;

//     onValue(firebaseRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         const lastSix = dataArray.slice(-limit);
//         setLastSixData(lastSix);
//       }
      
//     });
    
//   }, []);
   
//   return (
//     <div className='home_matches'>
//       {matches.map((match) => (
//         <div key={match.id}>
//           {/* Render the data from the lastSixData array here */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Blocks;


// import React, { Component, useState, useEffect } from 'react';
// // import { database } from '../../../firebase';
// import {database} from '../../../firebase'
// import { ref, onValue, limitToLast } from 'firebase/database';
// // import { ref, limitToLast } from 'firebase/d'
// class Blocks extends Component {
//     state ={
//         matches: [] 
//     }
//     componentDidMount(){
        
//         const MyComponent = () =>{
//             const [lastSixData, setLastSixData] = useState([])

//             useEffect(()=>{
//                 const firebaseRef = ref(database, 'matches');
//                 const limit = 6; 
//                 // const queryRef = limitToLast(6, database);
//                 onValue(firebaseRef, (snapshot)=>{
//                     const data = snapshot.val();
//                     if(data){
//                         const dataArray = lastSixData.values(data);
//                         // setLastSixData(dataArray);  
//                         const lastSix = dataArray.slice(-limit);
//                         setLastSixData(lastSix)

//                     }
                 
//                 })
//             }, [])
//             console.log(lastSixData)
//         }

//         // function fetchDataFromRealtimeDatabase() {
            
//         //     //   const databaseRef = ref(firebaseMatches, 'matches');
//         //       const queryRef = limitToLast(6, firebaseMatches);
//         //       onValue(queryRef, (snapshot) => {
//         //         const data = snapshot.val();
//         //         console.log(data);
//         //       });
//         //     }
//         //     fetchDataFromRealtimeDatabase();
              
  
        
//     }   
//     showMatches = () =>(
//         <div>   
//             match 
//         </div>
//     )
//     render(){   
//         return(
//             <div className='home_matches'>
//                 {this.showMatches(this.state.matches)}
//             </div>
//         )
//     }
// };
// export default Blocks