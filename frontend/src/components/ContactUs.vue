<template>
  <div class="bodyContent">
    <div :class="status === null ? 'box' : 'boxResponse'">
      <h2 v-if="status === null" style="margin-bottom: 20px;">Contact Us</h2>
      <form v-if="status === null" style="margin-bottom: 50px ">
        <v-text-field
          v-model="firstName"
          :counter="40"
          :rules="firstNameRules"
          label="First Name"
          required
          filled
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :counter="40"
          :rules="lastNameRules"
          label="Last Name"
          required
          filled
        ></v-text-field>
        <div style="display: flex;">
          <v-select
            style="margin-right: 10px"
            v-model="state"
            :items="states"
            :counter="32"
            :rules="stateRules"
            label="State"
            required
            filled
            @change="setCities()"
          ></v-select>
          <v-select
            v-if="cities.length > 0"
            style="margin-right: 10px"
            v-model="city"
            :items="cities"
            :rules="cityRules"
            label="City"
            :counter="32"
            filled
            required
          ></v-select>
        </div>
        <v-text-field
          v-model="street"
          label="Street Address"
          :rules="streetRules"
          :counter="128"
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="complement"
          :counter="128"
          label="Unit/Apt"
          :rules="[v => v.length <= 128 || 'Unit/Apt must be less than 128 characters']"
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :counter="128"
          label="E-mail"
          filled
          required
        ></v-text-field>
        <v-checkbox
          v-model="agree"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
        <div style="width: 100%; display: flex; justify-content: center;">
          <v-btn
            style="width: 200px; "
            class="mr-4"
            @click="sendContact()"
            :disabled="agree ? false : true"
            color="error"
          >
            submit
          </v-btn>

        </div>
      </form>
      <v-icon
        v-if="status"
        style="fontSize: 70px;"
          dark
          right
        >
          mdi-checkbox-marked-circle
      </v-icon>
      <div v-if="status" style="text-align: center; color: white; font-size: 20px">Contact sent successfully</div>
      <div v-if="status" style="text-align: center; color: white; font-size: 20px; text-decoration: underline; cursor: pointer;" @click="status = null">Send another message</div>
    </div>
  </div>
</template>

<script>
import { create, getCity } from '../api/contact'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      name: '',
      state: '',
      city: '',
      street: '',
      complement: '',
      email: '',
      states: ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NU', 'ON', 'PE', 'SK', 'QC', 'YT'],
      cities: [],
      status: 200,
      agree: false,
      //Validation Rules -----------------------------------------------------------
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        v => v.length <= 128 || 'E-mail must be less than 128 characters',
      ],
      firstNameRules: [
        v => !!v || 'First Name is required',
        v => v.length <= 40 || 'Name must be less than 40 characters',
      ],
      lastNameRules: [
        v => !!v || 'Last Name is required',
        v => v.length <= 40 || 'Last Name must be less than 40 characters',
      ],
      streetRules: [
        v => !!v || 'Street is required',
        v => v.length <= 128 || 'Last Name must be less than 128 characters',
      ],
      stateRules: [
        v => !!v || 'State is required',
        v => v.length <= 32 || 'Last Name must be less than 32 characters',
      ],
      cityRules: [
        v => !!v || 'City is required',
        v => v.length <= 32 || 'Last Name must be less than 32 characters',
      ],
    }
  },
  async mounted () {
    // if (this.darkMode) {
    //   this.$store.dispatch('setMode', this.darkMode)
    // } else {
    //   this.$store.dispatch('setMode', false)
    // }
  },
  methods: {
    async sendContact () {
      this.name = `${this.firstName} ${this.lastName}`
      console.log(this.name)
      const data = await create( this.name, this.street, this.complement, this.city, this.state, this.email)
      this.status = data.status
    },
    async setCities () {
      const cities = await getCity(this.state)
      this.cities = cities.data.Items
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .bodyContent {
    background-color: #b8b8b8;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      background-color: #fff;
      height: 800px;
      width: 35%;
      max-width: 500px;
      min-width: 200px;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 5px 5px 5px   #757575;
      // width: 300?px;
    }
    .boxResponse {
      background-color: #15bf34;
      width: 400px;
      height: 200px;
      display: flex;
      align-content: center;
      justify-content: center;
      border-radius: 10px;
      flex-direction: column;
    }
  }
</style>

