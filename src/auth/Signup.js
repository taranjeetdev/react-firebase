import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { user_signup } from '../Database/firebasefunctions';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Database/firebase';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Imglogo from '../Images/speech-bubble.png';

const Signup = ({isMobile}) => {
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        bio: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        bio: ''
    });
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const navigate = useNavigate();
    const [isPass, setIsPass] = useState(false);
    const [isConfirmPass, setIsConfirmPass] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setErrors({ ...errors, username: value === '' ? 'Username is required' : null });
                setFormdata({ ...formdata, username: value });
                break;
            case 'email':
                setErrors({ ...errors, email: value === '' ? 'Email is required' : !emailregex.test(value) ? "Enter a Valid Email" : null });
                setFormdata({ ...formdata, email: value });
                break;
            case 'password':
                setErrors({ ...errors, password: value === '' ? 'Password is required' : value.length <= 5 ? 'Password should be more than 5 characters' : null });
                setFormdata({ ...formdata, password: value });
                break;
            case 'confirmpassword':
                setErrors({ ...errors, confirmpassword: value === '' ? 'Confirm Password is required' : value !== formdata?.password ? 'Confirm Password doesnot match' : null });
                setFormdata({ ...formdata, confirmpassword: value });
                break;
            case 'bio':
                setErrors({ ...errors, bio: value === '' ? 'Bio is required' : null });
                setFormdata({ ...formdata, bio: value });
                break;

            default:
                setFormdata({ ...formdata, [name]: value });
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmpassword, bio } = formdata;
        setErrors({
            username: !username ? 'Username is required' : null,
            email: !email ? "Email is required" : null,
            password: !password ? "Password is required" : null,
            confirmpassword: !confirmpassword ? 'Confirm Password is required' : null,
            bio: !bio ? 'Bio is required' : null
        });

        if (username && email && password && confirmpassword && bio) {
            try {
                let getdata = await user_signup(formdata);
                let docref = doc(db, 'users', getdata.uid);
                const userdata = {
                    _id: getdata.uid,
                    username: username,
                    email: email,
                    bio: bio,
                    accessToken: getdata.accessToken
                };
                await setDoc(docref, userdata);
                toast.success("Account Created Successfully");
                localStorage.setItem('userDetails', JSON.stringify(userdata));
                window.location.reload();
            } catch (error) {
                toast.error("Error creating account: " + error.message);
            }
        }
    };


    return (
        <div className='login-page d-flex flex-column justify-content-center align-items-center position-relative'>
            <div className='position-absolute' style={{ top: '30px', left: '30px' }}>
                <img
                    src={Imglogo}
                    height={30}
                    alt='img not found'
                /> <span className='login-text'>Web Chat</span>
            </div>
            <div className={isMobile ? 'row justify-content-center' : 'row justify-content-center w-50'}>
                <div className='login-part col-12 col-12'>
                    <span className='d-block text-center login-heading'>Create Account</span>
                    <div className='d-flex justify-content-center'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group col-12'>
                                <label className='input-labels'>Username<span className='text-danger'>*</span> </label>
                                <input type='text' className='form-control' name='username' value={formdata?.username} onChange={handleChange} />
                                {errors?.username && <span className='text-danger'>{errors?.username}</span>}
                            </div>
                            <div className='form-group col-12'>
                                <label className='input-labels'>Email<span className='text-danger'>*</span> </label>
                                <input type='text' className='form-control' name='email' value={formdata?.email} onChange={handleChange} />
                                {errors?.email && <span className='text-danger'>{errors?.email}</span>}
                            </div>
                            <div className="form-group col-12">
                                <label className='input-labels'>Password<span className="text-danger">*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={isPass ? 'text' : 'password'} className="form-control" name="password" value={formdata?.password} onChange={handleChange} />
                                    {isPass ? (
                                        <FaEyeSlash style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setIsPass(!isPass)} />
                                    ) : (
                                        <FaEye style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setIsPass(!isPass)} />
                                    )}
                                </div>
                                {errors?.password && <span className="text-danger">{errors?.password}</span>}
                            </div>

                            <div className="form-group col-12">
                                <label className='input-labels'>Confirm Password<span className="text-danger">*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={isConfirmPass ? 'text' : 'password'} className="form-control" name="confirmpassword" value={formdata?.confirmpassword} onChange={handleChange} />
                                    {isConfirmPass ? (
                                        <FaEyeSlash style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setIsConfirmPass(!isConfirmPass)} />
                                    ) : (
                                        <FaEye style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setIsConfirmPass(!isConfirmPass)} />
                                    )}
                                </div>
                                {errors?.confirmpassword && <span className="text-danger">{errors?.confirmpassword}</span>}
                            </div>

                            <div className='form-group col-12'>
                                <label className='input-labels'>Bio<span className='text-danger'>*</span> </label>
                                <textarea className='form-control' name='bio' value={formdata?.bio} onChange={handleChange}></textarea>
                                {errors?.bio && <span className='text-danger'>{errors?.bio}</span>}
                            </div>
                            <button type='submit' className='btn btn-info w-100 mt-2'>Register</button>
                            <span className='d-block text-center mt-2 input-labels'>
                                Already have an account!
                                <Link to='/login' className='text-decoration-none' >Login</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
