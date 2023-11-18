import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { firebaseApp } from './firebase';
import { getAuth } from 'firebase/auth';

import './Resources/css/app.css';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  );
};

// Create the root only once
const root = ReactDOM.createRoot(document.getElementById('root'));

// Function to check if the user that is trying to enter is authenticated
const auth = getAuth(firebaseApp);
auth.onAuthStateChanged((user) => {
  // Use root.render() to update the existing root
  root.render(<App user={user} />);
});
