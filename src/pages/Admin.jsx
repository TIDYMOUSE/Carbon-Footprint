import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth , db } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const Admin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
          if (!currentUser) {
            navigate('/admin/login');
          } else {
            setUser(currentUser);
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);
    
    useEffect(() => {
        const fetchUserData = async () => {
          if (user) {
            const uid = user.uid;
            const q = query(collection(db, 'users'), where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs[0]?.data();
    
            if (userData && !userData.isAdmin) {
              await signOut(firebaseAuth);
            }
          }
        };
    
        fetchUserData();
      }, [user]);

    useEffect(() => {
        const getUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userData);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        getUsers();
      }, []);
    
      const handleToggleAdmin = async (userId, isAdmin) => {
        try {
          const newIsAdminValue = !isAdmin;
          const q = query(collection(db, 'users'), where('uid', '==', userId));
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.docs.length > 0) {
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(db, 'users', userDoc.id);
            await updateDoc(userRef, { isAdmin: newIsAdminValue });
            
            // Update local state
            setUsers(users.map((user2) => (user2.uid === userId ? { ...user, isAdmin: newIsAdminValue } : user)));
            if(user.uid===userId){
                signOut(firebaseAuth);
            }
            console.log('Admin status updated successfully');
          }
        } catch (error) {
          console.error('Error toggling admin status:', error);
        }
      };

    

  return (
    <div className='bg-white min-h-screen'>
        <nav className='flex justify-between px-8 py-6 bg-slate-400  items-center'>
            
      <h2 className='text-2xl font-bold'>Admin Page - User Information</h2>
      <button className='bg-slate-800 px-5 py-3 rounded-lg hover:bg-slate-900 text-slate-200' onClick={()=>{signOut(firebaseAuth)}}>Log-Out</button>

        </nav>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>

              <button onClick={() => handleToggleAdmin(user.uid, user.isAdmin)}>
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <div>Property List</div>

      </div>
    </div>
  );

}

export default Admin