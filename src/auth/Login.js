import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../Images/7123025_logo_google_g_icon.svg'
import { user_login } from '../Database/firebasefunctions';

const Login = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
            await user_login(formdata);
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
                    <span className='mt-2'>Doesn't have an account? <Link to='/' className='text-decoration-none' >Sign up</Link></span>
                </form>
            </div>
            <div>
                <p>or</p>
                <div>
                    <button className='btn btn-light'><img src={GoogleIcon} height={24} /> Login with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login
