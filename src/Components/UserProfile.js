import React from 'react'
import { BiEdit, BiInfoCircle, BiUser } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            <div className='container'>
                <div className='form-group'>
                    <div className='row'>
                        <label>
                            <BiUser size={20} /> 
                            Name
                        </label>
                    </div>
                    <span>{user?.username}</span> 
                    <span><MdEdit size={15}/></span>
                </div>
                <div className='form-group'>
                    <div className='row'>
                        <label><BiInfoCircle size={20}/> Bio</label>
                    </div>
                    <span>{user?.bio}</span> <span><MdEdit size={15} /></span>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
