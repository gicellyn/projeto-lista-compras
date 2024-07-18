import { collection } from "firebase/firestore";
import {db} from "./config"

export const intensCol = collection(db, "itens");

export async function add