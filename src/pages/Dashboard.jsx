import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';
import DashNav from '../components/DashNav';

const Dashboard = () => {
    const navigate=useNavigate();


  return (
    <div>
      <DashNav/>
      Dashboard
      </div>
  )
}

export default Dashboard