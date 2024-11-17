import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Database/firebase';
import { connect, useDispatch } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { start_loading, stop_loading } from "../../reduxData/Loader/loaderSlice";
import { useNavigate } from 'react-router-dom';
import { addingUser } from '../../reduxData/User/userSlice';

const ChatHome = ({ user, isAdd }) => {
  const [allChats, setAllChats] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(start_loading());
      try {
        const dataRef = collection(db, 'users', user._id, 'chatusers');
        const data = await getDocs(dataRef);
        setAllChats(data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); 
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stop_loading());
        dispatch(addingUser(false));
    }
    };
    getUsers();
  }, [isAdd]);

  return (
    <div className='pt-4'>
      {allChats.map((item, index) => (
        <div className="chat-box cursor-pointer" key={index} onClick={() => navigate(`/chat/${item?.id}`)}> 
          <div className="d-flex flex-column">
          <span>{item.username}</span>
          <span className="fw-bold">{item.email}</span>
          </div>
          <span className="pt-2" ><BsThreeDots color='blue' /> </span>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAdd: state.auth.isAdd,
  }
};

export default connect(mapStateToProps)(ChatHome);
