import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { get_chat_user_detail } from '../../Database/firebasefunctions';
import { BiSend } from 'react-icons/bi';

const ChatDetail = ({ user }) => {
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const get_chat_data = async () => {
      let data = await get_chat_user_detail(user?._id, id, dispatch);
      setDetail(data);
    };
    get_chat_data();
  }, []);

  return (
    <div className='pt-4'>
      {detail !== null &&
        <div className='d-flex flex-column'>
          <div className="chat-box">
            <div className="d-flex flex-column">
              <span>{detail?.username}</span>
              <span className="fw-bold">{detail?.email}</span>
            </div>
            <span className="pt-2" > </span>
          </div>
          <div className='chat-text-box'>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
            <span>2</span>
          </div>
          <div className='d-flex gap-4'>
            <input className='col-md-11' type='text' />
            <button type='button' className='btn btn-light cursor-pointer'>
              <BiSend color='#0dc4f0' size={20} />
            </button>
          </div>
        </div>
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
};
export default connect(mapStateToProps)(ChatDetail);
