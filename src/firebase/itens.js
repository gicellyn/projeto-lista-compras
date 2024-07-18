import { addDoc, collection } from "firebase/firestore";
import {db} from "./config"

export const itensCol = collection(db, "itens");

export async function addItem(data){
    await addDoc(itensCol, data);
}