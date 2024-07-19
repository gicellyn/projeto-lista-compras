import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUser(nome, email, senha) {
    const {user} = await createUserWithEmailAndPassword (auth, email, senha);

    await updateProfile(user, {displayName: nome});
}

export async function entrarGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
}


export async function loginUsuario(email, senha) {
    await signInWithEmailAndPassword(auth, email, senha);
}

export async function logout(){
    await signOut(auth);
}