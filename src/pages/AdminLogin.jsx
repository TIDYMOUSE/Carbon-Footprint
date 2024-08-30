// AdminLoginPage.jsx
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth, db } from '../utils/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [redirect,setRedirect] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const uid = userCredential.user.uid;
      const q = query(collection(db, 'users'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data()
      console.log("User Data:", userData); 
   

      if (userData && userData.isAdmin) {
        console.log("admin");
        const token = await userCredential.user.getIdToken();
        Cookies.set('jwtToken', token, { expires: 7, secure: true, sameSite: 'strict' });
        setRedirect(true)
      } else {
        console.log("not an admin");
        setError('User is not an admin');
        signOut(firebaseAuth)
      }
    } catch (error) {
      console.log(error);
      setError(error.code);
    }
  };

  useEffect(()=>{
    if(redirect){
        navigate('/admin')
    }
    console.log(redirect)

  },[redirect])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700 transition duration-200"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;
