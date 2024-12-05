import React from "react"
import Google from './assets/Google.jpg'
import Facebook from './assets/Facebook.png'
import Microsoft from './assets/Microsoft.png'
import GitHub from './assets/GitHub.png'
import './index.css'
import './LoginPage.css'
import { signInWithFacebook, signInWithGitHub, signInWithGoogle } from "./main"
export default async function LogIn() {

  return (
    <div className="Logins">
      
      {await Login_WithPNG(Google,"Google")}
    </div>
  )
}
async function Direct_To(Name){
  if(Name=="Google")await signInWithGoogle();
}
async function Login_WithPNG(Image,Name){
  return(
    <button className="Login" onClick={async()=>{await Direct_To(Name);window.location.reload();}}>
      <img src={Image} className="LoginImg"/>
      Sign in with {Name}
      
    </button>
  )
}