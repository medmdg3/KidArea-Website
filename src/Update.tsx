import { useState, useEffect } from 'react';
import {  doc, setDoc,getDoc } from 'firebase/firestore';
import { db } from './smth';
import React from 'react';
function Appa() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
      // Function to fetch user data from Firestore
      const fetchData = async () => {
        try {
          // Retrieve the user document with ID 'user1' from Firestore
          const userDocRef = doc(db, 'users', 'user1');
          const userDocSnapshot = await getDoc( userDocRef);
  
          if (userDocSnapshot.exists()) {
            // Set the component state with the user data
            const userData = userDocSnapshot.data();
            setName(userData.name);
            setEmail(userData.email);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      // Call the fetchData function
      fetchData();
    }, []); // Run the effect only once on component mount
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        // Update the user document with ID 'user1' in Firestore
        const userDocRef = doc(db, 'users', 'user1');
        await setDoc(userDocRef, { name: name, email: email });
  
        console.log("Document updated successfully!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
  
    return (
      <div>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
  
  export default Appa;