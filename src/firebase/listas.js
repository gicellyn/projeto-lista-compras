import { db } from "./config";
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore";


export async function adicionarLista(uid, lista) {
  const docRef = await addDoc(collection(db, "listas"), {
    ...lista,
    usuarioId: uid,
  });
  return docRef.id;
}


export async function obterListas(uid) {
  const q = query(collection(db, "listas"), where("usuarioId", "==", uid));
  const querySnapshot = await getDocs(q);
  const listas = [];
  querySnapshot.forEach((doc) => {
    listas.push({ id: doc.id, ...doc.data() });
  });
  return listas;
}

export const obterNomeLista = async (userId, listaId) => {
  try {
      const listaDocRef = doc(db, "listas", listaId);
      const listaDoc = await getDoc(listaDocRef);
      return listaDoc.exists() ? listaDoc.data().nome : "Nome da Lista Não Encontrado";
  } catch (error) {
      console.error("Erro ao obter nome da lista:", error);
      throw new Error("Erro ao obter nome da lista");
  }
};

export const obterItens = async (userId, listaId) => {
  try {
    const itensRef = collection(db, "usuarios", userId, "listas", listaId, "itens");
    const q = query(itensRef);
    const querySnapshot = await getDocs(q);
    const itens = [];
    querySnapshot.forEach((doc) => {
      itens.push({ id: doc.id, ...doc.data() });
    });
    return itens;
  } catch (error) {
    console.error("Erro ao obter itens:", error);
    throw new Error("Erro ao obter itens");
  }
};

export const deletarItem = async (userId, listaId, itemId) => {
  try {
    const itemRef = doc(db, "usuarios", userId, "listas", listaId, "itens", itemId);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    throw new Error("Erro ao deletar item");
  }
};