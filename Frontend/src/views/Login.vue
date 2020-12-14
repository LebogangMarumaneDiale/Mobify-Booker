<template>
    <div class="container">
        <div class="card login">
           <div class="card-body"> 
               <h2 class="card-title text-center">Login</h2>
               <form v-on:submit= "login" @submit.prevent="login" class="text-center">
                   <div class="form-group">
                       <input type="text" class="form-control" placeholder="Enter cell number:" name="phone_number" required v-model="userLogin.phone_number"><br>
                       <input type="password" class="form-control" placeholder="Enter password:" name="password" required v-model="userLogin.password">
                       <p v-if="errorText" class="text-danger">{{errorText}}</p>
                   </div>
                  <button type="button" @click="login(userLogin)" class="btn btn-primary">Login</button><br>
                  <br><a href="/register">Click here to register</a>
               </form>
           </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2/src/sweetalert2.js'

export default {
    name: 'login',
    data(){
        return{
            userLogin:{
            phone_number: '',
            password: ''
           },
           errorText: null,
        };
    },
    methods: {
        login(item){
             debugger;

            if(!item.phone_number || !item.password){

                this.errorText = "Please enter all fields!"
                //alert(errorText);
               
            } else{

                //debugger;

                var number =  item.phone_number;
                var password = item.password;
               // var user_id = 1;

            /*axios.get(`http://localhost:3000/users/${number}`)
            .then((response => {
                console.log("Number found: ", response)
                let user_id = 1;
                return user_id;
            }))*/

            axios.get(`http://localhost:3000/users/login/${number}/${password}`)
            

            .then((results) => {

                console.log("data found: ", results);

                 let user = results.data.addedUser.data[0].fn_users_login;

               if(user == false){

                   Swal.fire('Your user name or password is incorrect');

                 }

               else{
                   axios.get(`http://localhost:3000/users/isTechnician/${number}`)
                   
                   .then((response) => {

                       console.log("data found: ", response);

                       let istechnician = response.data.istechnician.data[0].fn_user_is_technician;

                       //var user_id = 1;

                       if(istechnician == true){

                           Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'You are succefully logged in as a technician',
                                showConfirmButton: false,
                                timer: 2500
                                })

                           this.$router.push({name: "List" , params: { id: number} })

                       }else{

                           Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'You are successfully logged in as a client',
                                showConfirmButton: false,
                                timer: 2500
                                })

                           this.$router.push({name: "ClientAppointments", params: { id: number}})
                       }

                   }).catch((error) => {

                       console.log(error)
                    
                    })
               }
            

            }).catch((error)=>{
                console.log("error message", error);
            })
           
           
            }
        }
    }
}
</script>

<style scoped>
.login{ 
    max-width: 450px;
    margin-top: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>