<template>
  <div class="container">
    <div class="card inspection">
      <div class="card-body">
        <h2 class="card-title text-center">Installation / Inspection sheet</h2><br>
        <h4 class="card-title text-center">Tick on items that are working</h4><br>

        <form v-on:submit= "inspection" @submit.prevent="inspection" class="text-center">
          <div class="form-group">

            <input
              type="text"
              class="form-control"
              name="inspector "
              placeholder=" Please confirm the registration number of the car: "
              required
              v-model="inspect.vehicle_reg_number"
            /><br>

            <label for="role"> Headlights</label>
            <input type="checkbox" class="form-control" name="role" value="headlights" v-model="inspect.headlights"><br><br>
            
            <label for="role"> Tail Lights</label>
            <input type="checkbox" class="form-control" name="role" value="tail_lights" v-model="inspect.tail_lights"><br><br>

            <label for="role"> Turn Indicator Lights</label>
            <input type="checkbox" class="form-control" name="role" value="turn_indicator_lights" v-model="inspect.turn_indicator_lights"><br><br>
    
            <label for="role"> Spot Lights</label>
            <input type="checkbox" class="form-control" name="role" value="spot_lights" v-model="inspect.spot_lights"><br>

            <label for="role"> Foot brakes</label>
            <input type="checkbox" class="form-control" name="role" value="foot_brakes" v-model="inspect.foot_brakes"><br><br>

            <label for="role"> Emergency parking brake</label>
            <input type="checkbox" class="form-control" name="role" value="parking_brake" v-model="inspect.parking_brake"><br><br>

            <label for="role"> Heat and Air Conditioning</label>
            <input type="checkbox" class="form-control" name="role" value="air_conditioning" v-model="inspect.air_conditioning"><br><br>

            <label for="role"> Windshield</label>
            <input type="checkbox" class="form-control" name="role" value="windshield" v-model="inspect.windshield"><br><br>

            <label for="role"> Front seat adjustment</label>
            <input type="checkbox" class="form-control" name="role" value="seat_adjustment" v-model="inspect.seat_adjustment"><br><br>

            <label for="role"> Steering mechanism</label>
            <input type="checkbox" class="form-control" name="role" value="steering_mechanism" v-model="inspect.steering_mechanism"><br><br>

            <label for="role"> Door Control(open, close, lock)</label>
            <input type="checkbox" class="form-control" name="role" value="door_control" v-model="inspect.door_control"><br><br>

            <label for="role"> Horn</label>
            <input type="checkbox" class="form-control" name="role" value="horn" v-model="inspect.horn"><br><br>

            <label for="role"> Speedometer</label>
            <input type="checkbox" class="form-control" name="role" value="speedometer" v-model="inspect.speedometer"><br><br>

            <label for="role"> Body condition/damage</label>
            <input type="checkbox" class="form-control" name="role" value="body_condition" v-model="inspect.body_condition"><br><br>

            <label for="role"> Muffler and exhaust system</label>
            <input type="checkbox" class="form-control" name="role" value="muffler_exhaust" v-model="inspect.muffler_exhaust"><br><br>

            <label for="role"> Condition of tires(including tread depth)</label>
            <input type="checkbox" class="form-control" name="role" value="tires" v-model="inspect.tires"><br><br>

            <label for="role"> Interior and exterior rear view mirrors</label>
            <input type="checkbox" class="form-control" name="role" value="mirrors" v-model="inspect.mirrors"><br><br>

            <label for="role"> Safety belts for drivers and passengers</label>
            <input type="checkbox" class="form-control" name="role" value="safety_belt" v-model="inspect.safety_belt"><br><br>

            <textarea
              type="text"
              class="form-control"
              placeholder="Briefly add comments:"
              name="comments"
              rows = 5
              v-model="inspect.comments">
            </textarea><br>
            

            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="button" @click="inspection(inspect)" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "inspection",
  data() {
    return {
        inspect: {
  
  //inspector_phone_num: '',
  id: this.$route.params.id,
  vehicle_reg_number: '',
  headlights: false,
  tail_lights: false,
  turn_indicator_lights: false,
  spot_lights: false,
  foot_brakes: false,
  parking_brake: false,
  air_conditioning: false,
  windshield: false,
  seat_adjustment: false,
  steering_mechanism: false,
  door_control: false,
  horn: false,
  speedometer: false,
  body_condition: false,
  muffler_exhaust: false,
  tires: false,
  mirrors: false,
  safety_belt: false,
  comments: '',

      },
      errorText: null,
      id: this.$route.params.id,
    };
  },
  methods: {
    inspection(item) {
        if(!item.vehicle_reg_number){

           this.errorText = "Please enter all fields!";
        }else{

          let car_registration_number = item.vehicle_reg_number;

          axios.get(`http://localhost:3000/appointments/checkregnum/${car_registration_number}`)

          .then((response) => {
          
            console.log("Data found", response);

            let vehicleExists = response.data.vehiclereg.data[0].fn_vehicle_number_exists;

                if(vehicleExists == false){

                    Swal.fire('There is no vehicle with the provided registration number on the system')

                }else{


            let report = {
                inspector_phone_num: item.id,
                vehicle_reg_number: item.vehicle_reg_number,
                headlights: item.headlights,
                tail_lights: item.tail_lights,
                turn_indicator_lights: item.turn_indicator_lights,
                spot_lights: item.spot_lights,
                foot_brakes: item.foot_brakes,
                parking_brake: item.parking_brake,
                air_conditioning: item.air_conditioning,
                windshield: item.windshield,
                seat_adjustment: item.seat_adjustment,
                steering_mechanism: item.steering_mechanism,
                door_control: item.door_control,
                horn: item.horn,
                speedometer: item.speedometer,
                body_condition: item.body_condition,
                muffler_exhaust: item.muffler_exhaust,
                tires: item.tires,
                mirrors: item.mirrors,
                safety_belt: item.safety_belt,
                inspected_by: item.inspected_by,
                client: item.client,
                vehicle_id: item.vehicle_id,
                comments: item.comments
            }
            debugger;
            axios.post('http://localhost:3000/appointments/inspection', report)
            .then(() => {

              Swal.fire('You have successfully filled inspection sheet')

              var car_registration_number = item.vehicle_reg_number;

              axios.patch(`http://localhost:3000/appointments/attendappointment/${car_registration_number}`)

              .then((results) => {

                console.log("data found: ", results)
                
                this.$router.push({ name: "List"})

                })
                
           }).catch(error => { debugger;
             console.log(error);
           })
            // e.preventDefault();

          }
            
        })
       }
        // e.preventDefault();
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style> 