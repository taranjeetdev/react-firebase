import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../Images/7123025_logo_google_g_icon.svg'
import { user_login } from '../Database/firebasefunctions';
import { toast } from 'react-toastify';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, db, provider } from '../Database/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { login } from '../reduxData/User/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [width,setWidth] =  useState(window.innerWidth);
    const handleSize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize",handleSize);
        return () => {
            window.addEventListener("resize",handleSize);
        }
    },[]);

    const isMobile = width <= 917;

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setErrors({ ...errors, email: value === '' ? 'Email is required' : !emailregex.test(value) ? "Enter a Valid Email" : null });
                setFormdata({ ...formdata, email: value });
                break;
            case 'password':
                setErrors({ ...errors, password: value === '' ? 'Password is required' : value.length <= 5 ? 'Password should be more than 5 characters' : null });
                setFormdata({ ...formdata, password: value });
                break;

            default:
                setFormdata({ ...formdata, [name]: value });
                setErrors({ ...errors, [name]: "" });
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formdata;
        setErrors({
            email: !email ? "Email is required" : "",
            password: !password ? "Password is required" : ""
        });
        if (emailregex.test(email) && password) {
            await user_login(formdata,dispatch);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = isMobile ? await signInWithRedirect(auth,provider) : await signInWithPopup(auth, provider);
            console.log(result);
            const userRef = doc(db, 'users', result?.user?.uid);
            const isdata = await getDoc(userRef);
            const userdata = {
                _id: result?.user?.uid,
                username: result?.user?.displayName,
                email: result?.user?.email,
                bio: '',
                accessToken: result?.user?.accessToken
            }
            if (!isdata.exists()) {
                await setDoc(userRef, userdata);
                toast.success("Login Successfully");
                login(userdata);
                // localStorage.setItem('userDetails', JSON.stringify(userdata));
                // window.location.reload();
            } else if (isdata.exists()) {
                toast.success("Login Successfully");
                login(userdata);
                // localStorage.setItem('userDetails', JSON.stringify(userdata));
                // window.location.reload();
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group col-md-6'>
                        <label>Email<span className='text-danger'>*</span> </label>
                        <input type='text' className='form-control' name='email' value={formdata?.email} onChange={handleChange} />
                        {errors?.email && <span className='text-danger'>{errors?.email}</span>}
                    </div>
                    <div className='form-group col-md-6'>
                        <label>Password<span className='text-danger'>*</span> </label>
                        <input type='text' className='form-control' name='password' value={formdata?.password} onChange={handleChange} />
                        {errors?.password && <span className='text-danger'>{errors?.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-primary mt-2'>Login</button>
                    <span className='mt-2'>Doesn't have an account? <Link to='/signup' className='text-decoration-none' >Sign up</Link></span>
                </form>
            </div>
            <div>
                <p>or</p>
                <div>
                    <button className='btn btn-light' onClick={handleGoogleLogin}><img src={GoogleIcon} height={24} /> Login with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login
