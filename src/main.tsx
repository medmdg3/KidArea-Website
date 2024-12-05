import React, { useState } from 'react';
import './index.css'
import './App.css'
import ReactDOM from 'react-dom/client'
import { Init } from './mymain';
import { Get_Games_Infos } from './test';
import firebase from 'firebase/app'
import { signInWithPopup,signInWithCustomToken, updatePassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider,GithubAuthProvider } from "firebase/auth";
import { auth } from './smth';
import LogIn from './LoginPage';
import Header from './Header';
import GameForm from './GameForm';
const root=ReactDOM.createRoot(document.getElementById('root')!);
let  A= await Get_Games_Infos();
let Inventory,MyGames:[string,string,string,string,string,string[]][]=[];
export function GET_A(){
  return A;
}
export function GET_MyGames(){
  if(auth.currentUser==null){
    return null;
  }
  MyGames=[];
  let h=auth.currentUser.email;
  for(let i=0;i<A.length;i++){
    if(A[i][2]==h)MyGames.push(A[i]);
  }
  return MyGames;
}

export function GET_MyGa(){
  return MyGames;
}
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
if(localStorage.getItem("KidArea_User_Email")==null ||localStorage.getItem("KidArea_User_Password")==null){
  localStorage.setItem("KidArea_User_Email","");
localStorage.setItem("KidArea_User_Password","");
}
export const signInWithGoogle = async () => {
  
    await signInWithPopup(auth,new GoogleAuthProvider())
    .then((result) => {
      // Handle successful sign-in
      const user = result.user;
      
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      return -1;
    });
};
export const signInWithGitHub = async () => {
  
  await signInWithPopup(auth,new GithubAuthProvider())
  .then((result) => {
    // Handle successful sign-in
    const user = result.user;
    
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
    return -1;
  });
};
export const signInWithFacebook = async () => {
  
  await signInWithPopup(auth,new FacebookAuthProvider())
  .then((result) => {
    // Handle successful sign-in
    const user = result.user;
    
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
    return -1;
  });
};
try{
await signInWithEmailAndPassword(auth,localStorage.getItem("KidArea_User_Email"),localStorage.getItem("KidArea_User_Password"));
}catch(error){
  console.log(error);
}
let user= auth.currentUser;
async function Log_In(f){
    await f();
    user= auth.currentUser;
    if(user==null) return;
  localStorage.setItem("KidArea_User_Email",user?.email);
  localStorage.setItem("KidArea_User_Password",generateRandomString(30));
  try{
  await updatePassword(user,localStorage.getItem("KidArea_User_Password"));
  }catch(error){
    console.error("Couldn't set the password: "+error);
  }
}

async function Render(){
 /* if(user==null){
    return(
      <>
      <Header/>
      </>
    );
  }else{*/
    return await Init();
  //}
}
root.render(
  <React.StrictMode>
    {await Render()}
  </React.StrictMode>
);

