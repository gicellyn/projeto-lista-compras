// src/firebase/listas.js

import { db } from "./config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Função para listar todas as listas de um usuário
export const listarListas = async (uid) => {
  const listasSnapshot = await getDocs(collection(db, `usuarios/${uid}/listas`));
  const listas = [];
  listasSnapshot.forEach((doc) => {
    listas.push({ id: doc.id, ...doc.data() });
  });
  return listas;
};

// Função para criar uma nova lista
export const criarLista = async (uid, lista) => {
  await addDoc(collection(db, `usuarios/${uid}/listas`), lista);
};

// Função para obter itens de uma lista
export const obterItens = async (uid, listaId) => {
  const itensSnapshot = await getDocs(collection(db, `usuarios/${uid}/listas/${listaId}/itens`));
  const itens = [];
  itensSnapshot.forEach((doc) => {
    itens.push({ id: doc.id, ...doc.data() });
  });
  return itens;
};

// Função para criar um novo item em uma lista
export const criarItem = async (uid, listaId, item) => {
  await addDoc(collection(db, `usuarios/${uid}/listas/${listaId}/itens`), item);
};

// Função para deletar um item de uma lista
export const deletarItem = async (uid, listaId, itemId) => {
  await deleteDoc(doc(db, `usuarios/${uid}/listas/${listaId}/itens`, itemId));
};

// Função para editar um item de uma lista
export const editarItem = async (uid, listaId, itemId, itemAtualizado) => {
  await updateDoc(doc(db, `usuarios/${uid}/listas/${listaId}/itens`, itemId), itemAtualizado);
};
