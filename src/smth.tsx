import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React from 'react';
// Initialize Firebase with your project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHPtmn5P5bcz2oZKigWx0eU81eSszmNbw",
  authDomain: "testing-8cdb3.firebaseapp.com",
  databaseURL: "https://testing-8cdb3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testing-8cdb3",
  storageBucket: "testing-8cdb3.appspot.com",
  messagingSenderId: "1088184723544",
  appId: "1:1088184723544:web:b0dd61bf8f1353c968022d",
  measurementId: "G-905NTB4H5W"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
function Appi() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, "users"), {
        name: name,
        email: email
      });
      
      // Reset form fields after successful submission
      setName('');
      setEmail('');
      
      console.log("Data written to Firestore successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Appi;