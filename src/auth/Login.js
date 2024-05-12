import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Login</h1>
                <form>
                    <div className='form-group col-md-6'>
                        <label>Email<span className='text-danger'>*</span> </label>
                        <input type='text' className='form-control' />
                    </div>
                    <div className='form-group col-md-6'>
                        <label>Password<span className='text-danger'>*</span> </label>
                        <input type='text' className='form-control' />
                    </div>
                    <button type='submit' className='btn btn-primary mt-2'>Login</button>
                    <span className='mt-2'>Doesn't have an account? <Link to='/' className='text-decoration-none' >Sign up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
