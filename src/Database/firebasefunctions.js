import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";
import { doc, getDoc } from 'firebase/firestore';


export const user_signup = async (userdata) => {
    let usercredentials = await createUserWithEmailAndPassword(auth,userdata.email,userdata.password);
    return usercredentials.user;
};

export const get_user_details = async (id) => {
    let docref = doc(db, 'users', id);
    let detail = await getDoc(docref);
    if (detail.exists()) {
        return detail.data();
    }
};
