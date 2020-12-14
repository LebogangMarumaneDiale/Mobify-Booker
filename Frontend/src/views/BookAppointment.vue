<template>
  <div class="container">
    <div class="card register">
      <div class="card-body">
        <h2 class="card-title text-center">Book an appointment</h2>
        <form v-on:submit= "book" @submit.prevent="book" class="text-center">
          <div class="form-group">

            
    
            <!--<input
              type="number"
              class="form-control"
              placeholder="Please confirm your phone number:"
              name="requester"
              v-model="Book.phone_number"
            /><br>-->

            <input
              type="text"
              class="form-control"
              placeholder="Enter car registration number:"
              name="carreg"
              v-model="Book.car_registration_number"
            /><br>

            <label for="date" style="font-style: italic;"><b> Please select date for appointment below: </b></label>          

            <input
              type="date"
              class="form-control"
              placeholder="Enter the appointment date:"
              name="date"
              v-model="Book.date_of_appointment"
            /><br>

            <input
              type="text"
              class="form-control"
              placeholder="Enter the car make:"
              name="make"
              v-model="Book.make"
            /><br>

            <input
              type="text"
              class="form-control"
              placeholder="Enter the car model:"
              name="model"
              v-model="Book.model"
            /><br>

            <input
              type="text"
              class="form-control"
              placeholder="Enter the color of the car:"
              name="color"
              v-model="Book.color"
            /><br>

            <textarea
              type="text"
              class="form-control"
              placeholder="Type any extra information needed here:"
              name="comments"
              v-model="Book.comments">
            </textarea><br>
            

            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="button" @click="book(Book)" class="btn btn-primary">Make appointment</button>
        </form>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "book",
  data() {
    return {
      Book: {
        //phone_number: this.$route.params.id,
        id: this.$route.params.id,
        car_registration_number: '',
        date_of_appointment: '',
        make: '',
        model: '',
        color: '',
        comments: '',
        //id: this.$route.params.id,

      },
      errorText: null,
      
      id: this.$route.params.id,
    };
  },
  methods: {
    book(item) {

      var reg_number = item.car_registration_number;

      if(!item.car_registration_number || !item.date_of_appointment || !item.make || !item.model || !item.color){

        this.errorText = "Please enter all fields!";

      }else{

      axios.get(`http://localhost:3000/appointments/checkregnum/${reg_number}`)
      
      .then((response) => {

        console.log("data found: ", response);

        let vehicleExists = response.data.vehiclereg.data[0].fn_vehicle_number_exists;

         if(vehicleExists == true){

           Swal.fire("Vehicle with this registration number is already booked for appointment")

        }else{
            let newAppointment = {
                //phone_number: item.phone_number,
                phone_number: item.id,
                car_registration_number: item.car_registration_number,
                date_of_appointment: item.date_of_appointment,
                make: item.make,
                model: item.model,
                color: item.color,
                comments: item.comments
            }

            axios.post('http://localhost:3000/appointments/addAppointment', newAppointment)
            .then(
                Swal.fire("You have successfully added an appointment"),
                this.$router.push({ name: "ClientAppointments"})
           ).catch(error => {
             console.log(error);
           })
            // e.preventDefault();

       }
        // e.preventDefault();
        })
    }
    }
  }
};
</script>

<style scoped>
.book {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style> 