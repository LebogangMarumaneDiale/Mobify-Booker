<template>
    <div class="container chat">
      
        <h2 class="text-primary text-center">Mobify Booker</h2>
        <h5 class="text-secondary text-center">You logged in as a technician</h5><br>
        <h6 class="text-secondary text-center"><b>Click any button below to perform an action</b></h6><br>

       <div class="card">

           <form v-on:submit= "getappointments" @submit.prevent="appointmentsclient">
        
                       <!--<input type="text" class="form-control" placeholder="Please confirm cell number:" name="phone_number" required v-model="clientappointment.phone_number_fk"><br>-->
                       <p v-if="errorText" class="text-danger">{{errorText}}</p>
                  <!--<input type="text" class="form-control" placeholder="Enter car registration number:" name="car_registration_number" v-model="cancelAppointment.car_registration_number"><br>-->
                  <button type="button" @click="getappointments(techappointments)" class="btn btn-primary">List all appointments</button><br><br>
                  <button type="button" @click="cancel()" class="btn btn-primary">Cancel appointment</button><br><br>
                  <button type="button" @click="getvehicles(allvehicles)" class="btn btn-primary">Display vehicles</button><br>
                  <br><button @click="inspect(makeInspection)" class="btn btn-secondary">FILL IN INSPECTION SHEET</button><br><br>
     
               </form>

           <div class="card-body">

               <h5>Table below list attended and unattended appointments</h5>
        <table>
            <div class="messages" v-chat-scroll="{always: false, smooth: true}">
            <thead>
                <tr style="text-decoration-line: underline; text-decoration-style: double;">
                    <th>Appointment booked by</th>
                    <th>Date of appointment</th>
                    <th>Date requested</th>
                    <th>Address of the car owner</th>
                    <th>Appointment attended</th>
                </tr>
            </thead>

            <tbody>
                <tr style="font-size: 15px; font-weight: bold;" v-for="appointment in techappointments.appointments" v-bind:key="appointment.phone_number_fk">

                    <td>{{ appointment.full_names}}</td>
                    <td>{{ appointment.date_of_appointment }}</td>
                    <td>{{ appointment.date_requested}}</td>
                    <td>{{ appointment.address}}</td>
                    <td style="color: blue;">{{ appointment.attended}}</td>
                    
                </tr>








            </tbody>

            <tfoot>

            </tfoot>
            </div>
        </table><br><br>

        <h5>Table below list all cars registered with the system</h5>

        <table>
            <div class="messages" v-chat-scroll="{always: false, smooth: true}">
            <thead>
                <tr style="text-decoration-line: underline; text-decoration-style: double;">
                    <th>Name of client</th>
                    <th>Address of the client</th>
                    <th>Vehicle Make</th>
                    <th>Vehicle model</th>
                    <th>Vehicle Registration</th>
                </tr>
            </thead>

            <tbody>
                <tr style="font-size: 15px; font-weight: bold;" v-for="vehicle in allvehicles.vehicles" v-bind:key="vehicle.owner">

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
       </div><br><br><br><br><br><br><br>
       <footer>
  <p>Author: Lebogang Diale</p>

</footer>
    </div>
    
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    name: 'clientappalt',
    data(){
        return{
            techappointments:{
            appointments: [],
           },
           allvehicles:{
            vehicles: [],
            id: this.$route.params.id,
           },

           makeInspection:{
            id: this.$route.params.id,
           },

           errorText: null,
           id: this.$route.params.id,

        };
    },
    methods: {
        getappointments(){
             debugger;

            axios.get("http://localhost:3000/appointments")
            

            .then((response) => {
                debugger;
                console.log(response.data);
                debugger;
                this.techappointments.appointments = response.data.appointments.data;

            }).catch((error)=>{
                console.log("error message", error);
            })
           
        },
        cancel(){
             debugger;

                var car_registration_number = prompt("Cornfirm registration of the car booked for");

             if(!car_registration_number){

                 Swal.fire('Registration number not entered')

             }else{

            axios.get(`http://localhost:3000/appointments/checkregnum/${car_registration_number}`)

            .then((response) => {

                console.log('Data found', response);

                let vehicleExists = response.data.vehiclereg.data[0].fn_vehicle_number_exists;

                if(vehicleExists == false){

                    Swal.fire('There is no vehicle with the provided registration number on the system')

                }else{


            axios.patch(`http://localhost:3000/appointments/cancel/${car_registration_number}`)
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

        inspect(item){

            var number =  item.id;

            this.$router.push({ name: 'Inspection', params: {id: number}})

        },

        getvehicles(){
             debugger;

            axios.get("http://localhost:3000/appointments/vehicles")
            

            .then((response) => {
                debugger;
                console.log(response.data);
                debugger;
                this.allvehicles.vehicles = response.data.vehicles.data;

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