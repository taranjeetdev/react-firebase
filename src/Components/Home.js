import React from 'react'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../LoadingSpinner';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("userdata",user)
  return (
    <div>
      <h4>Home Component</h4>
      <LoadingSpinner />
    </div>
  )
}

export default Home
