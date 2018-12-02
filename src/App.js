import React, { Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import GetAllBookings from './GetAllBookings';


class App extends Component {
  state =
  {
    users: [],
    newBkData: {
      dateAndTime: '',
      userId:''
    }
  ,
    newUserData:
{
        userName:''
      
},
    bookings: [],

    editUserData:
    {
      userId:'',
            userName:''
          
    },
    newBkModal: false,

    editUserModal :false
  }
  componentWillMount(){

  this._refreshList();
       
   
}
    toggleNewUserModal(){
      this.setState({
        newUserModal: ! this.state.newUserModal
      })

    
  }
  toggleNewBkModal()
  { this.setState({
    newBkModal: !this.state.newBkModal
  })}

  toggleEditUserModal()
  { this.setState({
    editUserModal: !this.state.editUserModal
  })}


  addBk() {
axios.post('http://35.234.129.245:8082/bookingApi/api/Booking/addBooking', this.state.newBkData). then
(( response)=> console.log(response.data))


  }
  addUser() {
axios.post('http://35.234.129.245:8082/bookingApi/api/User/addUser',this.state.newUserData).then ((response) => 
{
let {users} = this.state;
users.push(response.data)
this._refreshList();
this.setState({users, newUserModal: false,   newUserData:
  {
          userName:''
        
  }})
}
)}
updateUser(){
  let {userName} = this.state.editUserData;
axios.put('http://35.234.129.245:8082/bookingApi/api/User/updateUser/'+ this.state.editUserData.userId, {
  userName}). then ((response)=> {
this._refreshList();
this.setState({
  editUserModal:false, editUserData: {userName: '', userId:''}
})
console.log(response.data)}) 

}

editUser(userName, userId){
  this.setState ({
editUserData: {userName, userId }, editUserModal: ! this.state.editUserModal

  })
  
}
_refreshList() {
  axios.get('http://l35.234.129.245:8082/bookingApi/api/User/getAllUsers').then((response)=> 
  {console.log(response.data);
    this.setState({
    users: response.data
    
  })
});
 
}

deleteUser(userId){
axios.get('http://35.234.129.245:8082/bookingApi/api/User/deleteUser/'+ userId). then ((response) => { 
  this._refreshList();
})
}
  render() {


    let users= this.state.users.map((user)=>{
      
      return(<tr key= {user.userId}>

        <td>{user.userName}</td>
        
        <td>{user.userId}</td>
        <td>
          <Button color ="success" size="sm" className= "mr-2" onClick={this.editUser.bind(this, user.userName, user.userId)}>Edit</Button>
          <Button color ="danger" size= "sm" onClick= {this.deleteUser.bind(this, user.userId)}>Delete</Button>
        
        </td>

        </tr>)



    })
    return (
      <div className="App Container">
<h1>Bookings App </h1>


<GetAllBookings></GetAllBookings>

      <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>Sign up</Button>

        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Sign Up</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Input  id="txtUserName" placeholder= "Enter Your Name" 
            value={this.state.newUserData.userName} 
            onChange={(e) => { 
              let {newUserData} = this.state;
              newUserData.userName= e.target.value;
              this.setState({newUserData})}
            } >
            </Input>
            
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>Submit</Button>
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

         <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit User</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Input  id="txtUserName" placeholder= "Enter Your Name" 
            value={this.state.editUserData.userName} 
            onChange={(e) => { 
              let {editUserData} = this.state;
              editUserData.userName= e.target.value;
              this.setState({editUserData})}
            } >
            </Input>
            
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>Submit</Button>
            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Button color="primary" onClick={this.toggleNewBkModal.bind(this)}>Add Booking</Button>

        <Modal isOpen={this.state.newBkModal} toggle={this.toggleNewBkModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBkModal.bind(this)}>Add Booking</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Input  id="txtdateAndTime" placeholder= "dd/mm/yyyy hh:00" value={this.state.newBkData.dateAndTime} 
            onChange={(e) => { 
              let {newBkData} = this.state;
              newBkData.dateAndTime= e.target.value;
              this.setState({newBkData})}
            } >
            </Input>
            <Input id="txtBkId" placeholder= "Enter Your User Id" value={this.state.newBkData.userId} 
            onChange={(e) => { 
              let {newBkData} = this.state;
              newBkData.userId= e.target.value;
              this.setState({newBkData})}
            } >
            </Input>


            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBk.bind(this)}>Add Booking</Button>
            <Button color="secondary" onClick={this.toggleNewBkModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <Table>
        
        <thead>
          <tr>
            <th>Name</th>
           
            <th>User ID</th>
            <th>Actions</th>
            <th></th>
            
            </tr>


        </thead>
        <tbody>
          {users}




        </tbody>


      </Table>


      
   
      
      </div>
    );
  }
}

export default App;
