import { addDoc, collection, getDocs, where, query, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {db} from "./config"

export const itensCol = collection(db, "itens");

export async function addItem(data){
    await addDoc(itensCol, data);
}

export async function getItemsUsuario(idUsuario) {
    const filtro = query(itensCol, where("idUsuario", "==", idUsuario));
    const snapshot = await getDocs(filtro);
    const itens = [];

    snapshot.forEach((doc) => {
        itens.push({...doc.data(), id: doc.id});
    })

    return itens;
}

export async function deletarItem(id){
    const itemDoc = doc(itensCol, id);
    await deleteDoc(itemDoc);
}

export async function getItem(id) {
    const itemDoc = doc(itensCol, id);
    const item = await getDoc(itemDoc);

    return item.data();
}

export async function updateItem(id, data) {
    const itemDoc = doc(itensCol, id);
    await updateDoc(itemDoc, data);
}