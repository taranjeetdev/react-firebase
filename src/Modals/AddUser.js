import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { db } from '../Database/firebase';
import StateManagedSelect from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { get_user_details, start_chat_with_new_user } from '../Database/firebasefunctions';

const AddUser = ({ show, handleClose, user }) => {
    const [selectedVal, setSelectedVal] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch();

    const handleSelect = (option) => {
        setSelectedVal(option);
    };

    const handleStart = async () => {
        const getdata = await get_user_details(selectedVal.value); 
        const userdata = {
            id: getdata._id,
            username: getdata.username,
            email: getdata.email,
        };
        await start_chat_with_new_user(userdata,user,dispatch);
    };

    useEffect(() => {
        const getData = async () => {
            const usersCollection = collection(db, 'users');
            const data = await getDocs(usersCollection);
            const usersList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const flitered = usersList.filter((item) => item.id !== user?._id );
            setAllUsers(flitered.map((item) => ({ value: item.id, label: item.email })));
            //console.log("list ----->", usersList)
        };

        getData();
    }, []);

    const handleCancel = () => {
        setSelectedVal(null);
        handleClose();
    };

   // console.log(selectedVal)

   //console.log(allUsers);
   //console.log(user)

    return (
        <div>
            <Modal show={show}>
                <Modal.Body>
                    <h2 className='d-block text-center mt-2 input-labels'>Add User </h2>
                    <div className='form-group col-12'>
                        <StateManagedSelect
                        value={selectedVal}
                        options={allUsers}
                        onChange={handleSelect}
                        isClearable={true}
                        noOptionsMessage={() => "No User Found"}
                        />
                    </div>
                    
                    <div className='d-flex justify-content-end gap-2 mt-3'>
                        <button type='button' className='btn btn-info mt-2' disabled={selectedVal === null} onClick={handleStart} >
                            Start Chat
                        </button>
                        <button type='button' className='btn btn-danger btn-info mt-2' onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

export default connect(mapStateToProps)(AddUser);
