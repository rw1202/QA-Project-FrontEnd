import React, { Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
    

class GetAllBookings extends Component{
    
   
      state = {
        bookings: [], 
        bookingsModal: false
     
       
      }
      componentDidMount() {
        
       this._refreshList();
    }
     

    

      toggleBookingsModal() {
        
        this.setState({

          bookingsModal: ! this.state.bookingsModal
        });
      }

      deleteBooking(bookingId){
        axios.get('http://localhost:8080/bookingApi/api/Booking/deleteBooking/'+ bookingId). then ((response) => { 
          this._refreshList();
      })
    };

    _refreshList() {
      axios.get('http://localhost:8080/bookingApi/api/Booking/getAllBookings').then
      ((response)=> {
    
     
       this.setState({
          bookings: response.data 
        })
        console.log(this.state.bookings);
     })

    }

      render() {
        let bookings= this.state.bookings.map((booking)=>{
      
            return(
            
            <Table>
           
           <thead>
          <tr>
            <th>User ID</th>
           
            <th>Date And Time</th>
            <th>Booking ID</th>
            <th>Actions</th>
           
            
            </tr>


        </thead>

            <tr key= {booking.bookingId}>
      <td>{booking.userId}</td>
      
              <td>{booking.dateAndTime}</td>
              
              <td>{booking.bookingId }</td>
              
                               
              
              <td>
                <Button color ="success" size="sm" className= "mr-2" >Edit</Button>
                <Button color ="danger" size= "sm" onClick= {this.deleteBooking.bind(this, booking.bookingId)} >Delete</Button>
              
              </td>
      
              </tr>
              </Table>
              )
      
      
      
          })
        
                
            

        return (
         
          <div className="Booking Container">
       
          <Button color="primary" onClick={this.toggleBookingsModal.bind(this)}>All Bookings</Button>


            <Modal isOpen={this.state.bookingsModal} toggle={this.toggleBookingsModal.bind(this)} >
              <ModalHeader toggle={this.toggleBookingsModal.bind(this)}>All Bookings</ModalHeader>
             
              <ModalBody>
                  
                         {bookings}       </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </Modal>
          </div>
        );
        }
      }
    
        

        


export default GetAllBookings; 