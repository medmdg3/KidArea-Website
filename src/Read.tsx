import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import React from 'react';
import { db } from './smth';
console.log(14);
function Appl() {
  const [users, setUsers] = useState<any[]>([]); // Assuming 'users' is an array of objects

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        // Query the 'users' collection
        const usersCollectionRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollectionRef);
        // Extract data from snapshot
        const userData: any[] = [];
        usersSnapshot.forEach((doc) => {
          userData.push(doc.data());
          console.log(doc.ref.id);
        });

        // Update state with fetched data
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Run the effect only once on component mount

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appl;