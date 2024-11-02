import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { db } from '../Database/firebase';
import StateManagedSelect from 'react-select';

const AddUser = ({ show, handleClose }) => {
    const [val, setVal] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    const handleChange = async (value) => {
        setVal(value);
        const usersCollection = collection(db, 'users');
        const data = await getDocs(usersCollection);
        const usersList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if(value === ''){
            setAllUsers(usersList);
        } else {
            const searchUser = usersList.filter((emailval) => emailval.email.includes(value));
            setAllUsers(searchUser);
        }
    };

    console.log(allUsers);

    return (
        <div>
            <Modal show={show}>
                <Modal.Body>
                    <h2 className='d-block text-center mt-2 input-labels'>Add User </h2>
                    <div className='form-group col-12'>
                        <StateManagedSelect 
                        />
                        <input
                            type='text'
                            className='form-control input-fields'
                            name='email'
                            placeholder='Add User'
                            value={val}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <ul>
                        {val !== "" && allUsers.map((item, index) =>
                            <li key={index}>
                             {item.email}
                            </li>
                        )}
                    </ul>
                    <div className='d-flex justify-content-end gap-2 mt-3'>
                        <button type='submit' className='btn btn-info mt-2'>
                            Start Chat
                        </button>
                        <button type='button' className='btn btn-danger btn-info mt-2' onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddUser
