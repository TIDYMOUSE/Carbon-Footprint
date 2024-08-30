import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';

const Dashboard = () => {
    const navigate=useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
          if (!currentUser) {
            navigate("/")
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard