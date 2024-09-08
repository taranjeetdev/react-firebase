import React from 'react'
import { useSelector } from 'react-redux'
import ChatLogo from '../Images/mobile-chatting.png';
import { BiArrowToRight } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className='home-page'>
      <div className='col-lg-6 home-cont'>
        <p className='home-text'>
          Welcome to Web Chat
        </p>
        <p className='m-text'>
          Easy Chat with Friends
        </p>
        <button className='btn-start' onClick={() => navigate('/login')}>
          Get Started <FaArrowRight/>
        </button>
      </div>
      <div className='col-lg-6'>
        <img className='img-size' src={ChatLogo} alt='not found' />
      </div>
     </div>
  )
}

export default Home
