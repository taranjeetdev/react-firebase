import React from 'react'
import { BiChat, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
            <Sidebar width={5} style={{ height: '100vh',backgroundColor: 'white'}}>
                <Menu>
                    <MenuItem onClick={() => navigate('/chats')} className='text-center'> <BiChat/> Chats</MenuItem>
                    <MenuItem onClick={() => navigate('/profile')} className='text-center'><CgProfile/> Profile</MenuItem>
                    <MenuItem onClick={handleLogout} className='text-center'><BiLogOut size={26}/></MenuItem>
                </Menu>
            </Sidebar>
    )
}

export default SideBar
