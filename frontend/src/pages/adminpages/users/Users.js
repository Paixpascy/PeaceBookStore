import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const Users = () => {
    const [allUsers,setAllUsers]=useState([])
    const [changeRole,setchangeRole]=useState({})
    const[selectedRole,setSelectedRole]=useState(null)
    const [modal,setModal]=useState(false)

    const getAllUsers=async()=>{
        try {
            const usersResponse= await axios.get('http://127.0.0.1:3004/authRoute/getUsers')
             setAllUsers(usersResponse.data?.data) 
        } catch (error) {
           toast('unable to get users') 
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])

    const openModal=(user)=>{
        setSelectedRole(user)
        setchangeRole({[user._id]:user.role})
        setModal(true)
    }
    const closeModal=()=>{
        setModal(false)
    }

    const saveNewRole=async()=>{
        if(!selectedRole)
            return;
        try {
            const newRole= await axios.put(`http://127.0.0.1:3004/authRoute/editUser/${selectedRole._id}`,{
                role:changeRole[selectedRole._id]
            })
            if(newRole){
                toast.success('role changed successfully')
                closeModal()
                getAllUsers()
            }
        } catch (error) {
            toast.error('unable to change role',error)
        }
    }
  return (
    <>
    <div className='usersavailabe'>
        <div className='userstitle'>
            <h2>list of users</h2>
        </div>
        <div className='userslist'>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>assign new role</th>
                </tr>
                </thead>
                <tbody>
                    {allUsers.map((user,index) =>(
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={()=>{openModal(user)}}>change role</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    <Modal isOpen={modal} onRequestClose={closeModal} className='modalcontents'>
        <div className='modaltitle'>
            <h2>change role of{selectedRole?.name}</h2>
        </div>
        <div className='selectrole'>
            <select value={changeRole[selectedRole?._id] ||''} 
            onChange={(e)=>setchangeRole({...changeRole,[selectedRole._id]:e.target.value})}>
                <option>admin</option>
                <option>user</option>
            </select>
        </div>
        <div className='saverole'>
            <button onClick={saveNewRole}>save</button>
            <button onClick={closeModal}>cancle</button>
        </div>
    </Modal>
    </>
  )
}

export default Users
