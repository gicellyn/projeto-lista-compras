// SavedLists.js
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const SavedLists = () => {
  const [user] = useAuthState(auth);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  const fetchLists = async () => {
    const listsCollection = collection(db, 'lists');
    const listsSnapshot = await getDocs(listsCollection);
    const listsData = listsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLists(listsData);
  };

  const addList = async () => {
    if (newList.trim() === '') return;
    await addDoc(collection(db, 'lists'), {
      userId: user.uid,
      name: newList
    });
    setNewList('');
    fetchLists();
  };

  const deleteList = async (id) => {
    await deleteDoc(doc(db, 'lists', id));
    fetchLists();
  };

  return (
    <div className="container mt-5">
      <h2>Listas Salvas</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="Nova Lista"
        />
        <button className="btn btn-primary" onClick={addList}>
          Adicionar Lista
        </button>
      </div>
      <ul className="list-group">
        {lists.map(list => (
          <li key={list.id} className="list-group-item d-flex justify-content-between align-items-center">
            {list.name}
            <button className="btn btn-danger" onClick={() => deleteList(list.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLists;