<template>
    <div class="container chat">
      
        <h2 class="text-primary text-center">Mobify Booker</h2>
        <h5 class="text-secondary text-center">You logged in as a client</h5><br>
        <h6 class="text-secondary text-center"><b>Click any button below to perform an action</b></h6><br>

       <div class="card">

           <form v-on:submit= "getappointments" @submit.prevent="appointmentsclient">
        
                       <!--<input type="text" class="form-control" placeholder="Please confirm cell number:" name="phone_number" required v-model="clientappointment.phone_number_fk"><br>-->
                       <p v-if="errorText" class="text-danger">{{errorText}}</p>
                  <!--<input type="text" class="form-control" placeholder="Enter car registration number:" name="car_registration_number" v-model="cancelAppointment.car_registration_number"><br>-->
                  <button type="button" @click="getappointments(clientappointment)" class="btn btn-primary">List all appointments</button><br><br>
                  <button type="button" @click="cancel(cancelAppointment)" class="btn btn-primary">Cancel appointment</button><br><br>
                  <button type="button" @click="getvehicles(clientvehicle)" class="btn btn-primary">Display vehicles</button><br>
                  <br><button @click="book(bookAppointment)" class="btn btn-secondary">BOOK AN APPOINTMENT</button><br><br>
     
               </form>

           <div class="card-body">
        <table>
            <div class="messages" v-chat-scroll="{always: false, smooth: true}">
            <thead>
                <tr style="text-decoration-line: underline; text-decoration-style: double;">
                    <th>Your name</th>
                    <th>Date of appointment</th>
                    <th>Date requested</th>
                    <th>Your Address</th>
                    <th>Appointment attended</th>
                </tr>
            </thead>

            <tbody>
                <tr style="font-size: 15px; font-weight: bold;" v-for="appointment in clientappointment.appointments" v-bind:key="appointment.phone_number_fk">

                    <td>{{ appointment.full_names}}</td>
                    <td>{{ appointment.date_of_appointment }}</td>
                    <td>{{ appointment.date_requested}}</td>
                    <td>{{ appointment.address}}</td>
                    <td style="color: red;">{{ appointment.attended}}</td>
                    
                </tr>
            </tbody>

            <tfoot>

            </tfoot>
            </div>
        </table><br><br>

        <table>
            <div class="messages" v-chat-scroll="{always: false, smooth: true}">
            <thead>
                <tr style="text-decoration-line: underline; text-decoration-style: double;">
                    <th>Your name</th>
                    <th>Your Address</th>
                    <th>Vehicle Make</th>
                    <th>Vehicle model</th>
                    <th>Vehicle Registration</th>
                </tr>
            </thead>

            <tbody>
                <tr style="font-size: 15px; font-weight: bold;" v-for="vehicle in clientvehicle.vehicles" v-bind:key="vehicle.owner">

                    <td>{{ vehicle.full_names}}</td>
                    <td>{{ vehicle.address }}</td>
                    <td>{{ vehicle.make}}</td>
                    <td>{{ vehicle.model}}</td>
                    <td>{{ vehicle.registration_number}}</td>
                    
                </tr>
            </tbody>

            <tfoot>

            </tfoot>
            </div>
        </table>

           </div>
       </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    name: 'clientappalt',
    data(){
        return{
            clientappointment:{
            appointments: [],
            id: this.$route.params.id
           },

            bookAppointment:{
            id: this.$route.params.id,
           },

           cancelAppointment:{
            id: this.$route.params.id,
           },

           clientvehicle:{
            vehicles: [],
            id: this.$route.params.id,
           },

           errorText: null,
           id: this.$route.params.id,

        };
    },
    methods: {
        getappointments(item){
             debugger;

            var number =  item.id;

            axios.get(`http://localhost:3000/appointments/clientappointments/${number}`)
            

            .then((response) => {
                debugger;
                console.log(response.data);
                debugger;
                this.clientappointment.appointments = response.data.appointments.data;

                if(response.data.appointments.data==0){

                    this.errorText = "You currenctly have no appointments"

                }

            }).catch((error)=>{
                console.log("error message", error);
            })
           
        },
        cancel(item){
             debugger;

                var number = item.id;

                var car_registration_number = prompt("Confirm registration of the car booked for");

                if(!car_registration_number){

                    Swal.fire('You did not enter any registration number')

                }else{
             
            axios.get(`http://localhost:3000/appointments/checkvehicle/${number}/${car_registration_number}`)
            .then((response) => {

                console.log("data found: ", response);

                let plateNumber = response.data.vehiclereg.data[0].fn_client_plate_number_exists;

                if(plateNumber == false){

                    Swal.fire("You do not have a car registered with the provided registration number")

                }else{

            
            axios.patch(`http://localhost:3000/appointments/clientcancel/${number}/${car_registration_number}`)
            .then((results)=>{
                console.log("data found: ", results);

                   Swal.fire('Appointment was succesfully cancelled');
               
            }).catch((error)=>{
                console.log("error message", error);
            })

                }
           
           })

        }
            
        },

        book(item){

            var number =  item.id;

            this.$router.push({ name: 'BookAppointment', params: {id: number}})

        },
        getvehicles(item){
             debugger;
             
                var number =  item.id;

            axios.get(`http://localhost:3000/appointments/clientvehicles/${number}`)
            

            .then((response) => {
                debugger;
                console.log(response.data);
                debugger;
                this.clientvehicle.vehicles = response.data.vehicles.data;

                if(response.data.vehicles.data==0){

                    this.errorText = "You have not added a car yet"

                }

            }).catch((error)=>{
                console.log("error message", error);
            })
           
           
        
        }
    }
}
</script>

<style scoped>
.chat h2{
    font-size: 41px;/*2.6em*/ 
    margin-bottom: 0px;
}

.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}

.chat span{
    font-size: 19px;/*1.2em*/
}

.chat .time{
    display: block;
    font-size: 11px;/*0.7em*/
}

.messages{
    max-height: 300px;
    overflow:auto;
}


.sidenav {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  border-style: dotted;
  margin-left: 100px;
  margin-top: 10px;
  border-color: maroon;
  display: inline-block;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: black;
  display: block;
}

table, th, td{
border: 1px solid grey;
margin-left: auto;
  margin-right: auto;
  border-spacing: 15px;
  padding: 5px;
  padding-right: 100px;
}

</style>
