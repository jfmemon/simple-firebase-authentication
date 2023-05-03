import './App.css';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import firebaseApp from './firebase/config.init';
import { useState } from 'react';


const auth = getAuth(firebaseApp);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const handleSingInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }

  const handleSingInWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }

  const handleSingInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error( 'Error: ',error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  return (
    <div className="App">
      {user.email ?
        <button onClick={handleSignOut}>Sign Out</button> :
        <>
          <button onClick={handleSingInWithGoogle}>Sign in with google</button>
          <button onClick={handleSingInWithGithub}>Sign in with github</button>
          <button onClick={handleSingInWithFacebook}>Sign in with facebook</button>
        </>
      }
      {user.email && <div>
        <h3>User Name: {user.displayName}</h3>
        <p>Email Address: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;