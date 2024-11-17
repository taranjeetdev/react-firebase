import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../reduxData/Loader/loaderSlice";
import { login } from "../reduxData/User/userSlice";

export const catch_error_handler = (error) => {
    if (error.message == "Firebase: Error (auth/network-request-failed).") {
        toast.error("Network Error");
    } else if (error.message == "Firebase: Error (auth/invalid-credential).") {
        toast.error("Invalid Credentials");
    } else {
        toast.error(error.message);
    }
};

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

export const user_login = async (formdata, dispatch) => {
    dispatch(start_loading());
    try {
        let userlogin = await signInWithEmailAndPassword(auth, formdata?.email, formdata?.password);
        if (userlogin) {
            let userdetail = await get_user_details(userlogin.user.uid);
            dispatch(login(userdetail));
            toast.success("Login Successfully", { toastId: "usrrlogined", autoClose: 2000 });
        }
    } catch (error) {
        catch_error_handler(error);
    } finally {
        dispatch(stop_loading());
    }
};

export const start_chat_with_new_user = async (newdata, user, dispatch) => {
    dispatch(start_loading());
    try {
        const docRef = doc(db, 'users', user._id);
        const subRef = doc(db, 'users', user._id, 'chatusers', newdata.id);
        const getSubData = await getDoc(subRef);
        if (getSubData.exists()) return;

        await setDoc(subRef, newdata);
        return true;
    } catch (error) {
        catch_error_handler(error);
    } finally {
        dispatch(stop_loading());
    }
};

export const get_chat_user_detail = async (userid, chatid, dispatch) => {
    dispatch(start_loading());
    try {
        const docRef = doc(db, 'users', userid, 'chatusers', chatid);
        const chatdata = await getDoc(docRef);
        return chatdata.data();
    } catch (error) {
        catch_error_handler(error);
    } finally {
        dispatch(stop_loading());
    }
};

export const get_my_chat_users = async (userid, dispatch) => {
    dispatch(start_loading());
    try {
        const docRef = collection(db, 'users', userid, 'chatusers');
        const docsData = await getDocs(docRef);
        const list = docsData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return list;
    } catch (error) {
        catch_error_handler(error);
    } finally {
        dispatch(stop_loading());
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