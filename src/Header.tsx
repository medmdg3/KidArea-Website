import './App.css';
import React from 'react';
import { useState } from 'react';
import { auth } from './smth';
import './Header.css'
import LogIn from './LoginPage';
import { signInWithGoogle } from './main';
function Header() {
  const [activeLink, setActiveLink] = useState(null);
  const isLoged=(auth.currentUser!=null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="kid-area">
            <GamepadIcon className="h-6 w-6 text-blue-500 dark:text-purple-300" />

            <span className="text-lg font-semibold text-blue-500 dark:text-purple-300">  KidArea Games</span>
        </div>
        
        
       {false && <a href="#" onClick={() => {handleLinkClick('inventory');localStorage.setItem("KidArea_Main_Detail","Inventory");}} className={activeLink === 'inventory' ? 'active' : ''}>
          Inventory
        </a>}
        {isLoged && <a href="#" onClick={() => {handleLinkClick('Upload');localStorage.setItem("KidArea_User_Page","Upload");window.location.reload();}} className={activeLink === 'Upload' ? 'active' : ''}>
          Upload
        </a>}
        <a href="#" onClick={() => {handleLinkClick('find-game');localStorage.setItem("KidArea_User_Page","Main");localStorage.setItem("KidArea_Main_Detail","All");window.location.reload();}} className={activeLink === 'find-game' ? 'active' : ''}>
          Explore games!
        </a>
        {isLoged && <a href="#" onClick={() => {handleLinkClick('my-games');localStorage.setItem("KidArea_User_Page","Main");localStorage.setItem("KidArea_Main_Detail","MyGames");window.location.reload();}} className={activeLink === 'my-games' ? 'active' : ''}>
          My games
        </a>}
        {isLoged &&<a href="#"  className={activeLink === 'User_info' ? 'active' : ''}>
          {auth.currentUser?.email}
        </a>}
        {isLoged &&<a href="#" onClick={() => {handleLinkClick('sign-out');localStorage.setItem("KidArea_User_Password","W");auth.signOut();window.location.reload();}}className={activeLink === 'sign-out' ? 'active' : ''}
>
          Sign out
        </a>}
        {!isLoged &&<a href="#" onClick={async () => {handleLinkClick('sign-in');await signInWithGoogle();if(auth.currentUser!=null){window.location.reload();}}}className={activeLink === 'sign-out' ? 'active' : ''}
>
          Sign in
        </a>}
      </nav>
    </div>
  );
}

export default Header;
function GamepadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="15" x="2" y="6" rx="2" />
    </svg>
  )
}
