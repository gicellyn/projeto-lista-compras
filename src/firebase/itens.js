import { addDoc, collection, getDocs, where, query, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";


const getItensCollection = (userId, listaId) => collection(db, "usuarios", userId, "listas", listaId, "itens");


export async function addItem(userId, listaId, data) {
    const itensCol = getItensCollection(userId, listaId);
    await addDoc(itensCol, data);
}


export async function getItemsUsuario(userId, listaId) {
    const itensCol = getItensCollection(userId, listaId);
    const filtro = query(itensCol, where("idUsuario", "==", userId));
    const snapshot = await getDocs(filtro);
    const itens = [];

    snapshot.forEach((doc) => {
        itens.push({...doc.data(), id: doc.id});
    });

    return itens;
}


export async function deletarItem(userId, listaId, id) {
    const itemDoc = doc(getItensCollection(userId, listaId), id);
    await deleteDoc(itemDoc);
}


export async function getItem(userId, listaId, id) {
    const itemDoc = doc(getItensCollection(userId, listaId), id);
    const item = await getDoc(itemDoc);
    return item.data();
}


export async function updateItem(userId, listaId, id, data) {
    const itemDoc = doc(getItensCollection(userId, listaId), id);
    await updateDoc(itemDoc, data);
}

