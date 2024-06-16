import React ,{useEffect,useState} from 'react'
import CustomButton from '../../customcomponents/customButton/CustomButton';
import'./UserList.css';
import Table from 'react-bootstrap/Table';
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import UserFormModal from'../../customcomponents/Modal/fFormModal';
import { toast } from 'react-toastify';

const UserList = () => {
const[userData,setUserData]=useState([])
const[loading,setLoading]=useState(true);
const [showModal, setShowModal] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

useEffect(()=>{
    getUserData()
},[])

const getUserData=()=>{  
    fetch('http://localhost:8000/api/users').then((resp)=>resp.json())
    .then((data)=>{
        setUserData(data);
        setLoading(false)
    })
    .catch(err=>console.log(err))
}


const handleSaveUser = async (user) => {
    try {
      const response = user._id
        ? await fetch(`http://localhost:8000/api/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
        : await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
console.log(response, "response123")
      if (response.ok) {
        getUserData();
        handleCloseModal();
        toast.success(user._id ? 'Updated successfully' : 'Created new user successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
            });
      } else {
        console.error('Error saving user:', response.statusText);
        toast.error('Error saving users');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };


const handleAddUser = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

const handleUpdate=(id,user)=>{
    setCurrentUser(user);
    setShowModal(true);
}

const handleDelete=async(id)=>{
    try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
            toast.success('deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
                });
        //   setUsers(users.filter(user => user._id !== userId));
        getUserData();
        
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }

}


  return (
    <>
    {
        loading? <h6>loading....</h6> :
<div className="container">

<div className='addbtn'>
<CustomButton 
    onClick={handleAddUser}
    size="large"
    >
    Add User
    </CustomButton>
</div>

<div className='tablelist'> 
    {userData.length>0?(
<Table striped bordered hover >
      <thead >
        <tr style={{backgroundColor:"black", color:"white"}}>
        <th>firstname</th>
        <th>lastname</th>
        <th>email</th>
        <th>age</th>
        <th>action</th>
        </tr>
      </thead>
      <tbody>
 {
    userData&&userData.map((user,index)=>{
        const{firstname="", lastname="", email="",age="",_id=""}=user;
        return(
            <tr key={_id} style={{backgroundColor:"#D5E4EC", color:"black",fontWeight:"normal"}}>
       <td>{firstname}</td>
       <td>{lastname}</td>
       <td>{email}</td>
       <td>{age}</td>
       <td>
        <tr className='iconsgroup'>
            <td className='icons' onClick={()=>handleUpdate(_id, user)}><MdEdit color="blue" size="20"/></td>
            <td className='icons' onClick={()=>handleDelete(_id)}><MdOutlineDelete color="red" size="20" /></td>
        </tr>
       </td>
            </tr>
        )
    }
)
 }
      </tbody>
    </Table>
      ):(

        <h6 style={{color:"red", textAlign:"center", fontWeight:"bold"}}>no data found!!</h6>
      )}
</div>

</div>
    }


    <div>
<UserFormModal 
 show={showModal}
 handleClose={handleCloseModal}
 handleSave={handleSaveUser}
 user={currentUser}
/>
    </div>

   
    </>
  )
}

export default UserList