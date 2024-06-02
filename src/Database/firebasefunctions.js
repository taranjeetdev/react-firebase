import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";


export const user_signup = async (userdata) => {
    let usercredentials = await createUserWithEmailAndPassword(auth, userdata.email, userdata.password);
    return usercredentials.user;
};

export const get_user_details = async (id) => {
    let docref = doc(db, 'users', id);
    let detail = await getDoc(docref);
    if (detail.exists()) {
        return detail.data();
    }
};

export const user_login = async (formdata) => {
    try {
        let userlogin = await signInWithEmailAndPassword(auth, formdata?.email, formdata?.password);
        if (userlogin) {
            let userdetail = await get_user_details(userlogin.user.uid);
            localStorage.setItem('userDetails', JSON.stringify(userdetail));
            toast.success("Login Sucessfully");
            window.location.reload();
        }
    } catch (error) {
        toast.error(error.message);
    }
};

// export const user_login = async (formdata) => {
//     try {
//         let userlogin = await signInWithEmailAndPassword(auth, formdata?.email, formdata?.password);
//         console.log("Login success:", userlogin);
//         if (userlogin) {
//             let userdetail = await get_user_details(userlogin.user.uid);
//             localStorage.setItem('userDetails', JSON.stringify(userdetail));
//             window.location.reload();
//             toast.success("Login Successfully");
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         // Assuming error.message contains the error message from Firebase
//         toast.error(error.message);
//     }
// };