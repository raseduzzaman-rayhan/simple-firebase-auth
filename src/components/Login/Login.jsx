import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null)

    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        console.log("google sign in clicked");
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }


    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            // console.log(result);
            // setUser(result.user);
        
            const loggedInUser = result.user;
            console.log(loggedInUser);

            if (!loggedInUser.email && loggedInUser?.providerData?.length) {
                console.log("User email is not directly provided");
                if(loggedInUser.providerData[0].email) {
                   loggedInUser.email=loggedInUser.providerData[0].email 
                    setUser(loggedInUser);
                }
                // const userEmail=loggedInUser.providerData[0].email;
            }

        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSignOut = ( ) => {
        signOut(auth).then(() => {
            console.log("Signout Completed");
            setUser(null);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <h2>Please Login</h2>
            {/* <button onClick={handleGoogleSignIn}>Sign In With Google</button>
            <button onClick={handleSignOut}>Sign Out</button> */}

            {/* {
                user ?  <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleGoogleSignIn}>Sign In With Google</button>
            } */}
            {
                user ?  <button onClick={handleSignOut}>Sign Out</button> :
                <>
                <button onClick={handleGoogleSignIn}>Sign In With Google</button>
                <button onClick={handleGithubSignIn}>Sign In With GitHub</button>
                </>
            }

            {
                user && <div>
                    <h3>Name : {user.displayName}</h3>
                    <p>Email : {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;