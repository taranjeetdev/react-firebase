import React, { useState } from 'react'
import { BiChat, BiLogOut, BiPlus } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from './reduxData/User/userSlice';
import { catch_error_handler } from './Database/firebasefunctions';
import { start_loading, stop_loading } from './reduxData/Loader/loaderSlice';
import AddUser from './Modals/AddUser';

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShow,setIsShow] = useState(false);

    const handleLogout = () => {
        dispatch(start_loading());
        try {
            dispatch(logout());
        } catch (error) {
            catch_error_handler(error);
        } finally {
            dispatch(stop_loading());
        }
    };

    return (
       <div>
         <Sidebar className='fixed-sidebar' width={5} style={{ backgroundColor: 'rgb(249 249 249 / 0%)' }}>
            <Menu style={{ backgroundColor: 'rgb(249 249 249 / 0%)' }} >
                <MenuItem className='text-center'>
                    <button type='button' className='btn btn-light' onClick={() => setIsShow(!isShow)}>
                        Add Chat <BiPlus color='blue' />
                    </button>
                </MenuItem>
                <MenuItem onClick={() => navigate('/')} className='text-center'> <BiChat /> Chats</MenuItem>
                <MenuItem onClick={() => navigate('/profile')} className='text-center'><CgProfile /> Profile</MenuItem>
                <MenuItem onClick={handleLogout} className='text-center'><BiLogOut size={26} /></MenuItem>
            </Menu>
        </Sidebar>
        <AddUser show={isShow} handleClose={() => setIsShow(false)} />
       </div>
    )
}

export default SideBar
