<template>
  <div class="bodyContent">
    <div class="box">
      <h1 style="text-align: center;">Contact Us</h1>
      <form style="margin-bottom: 50px ">
        <v-text-field
          v-model="firstName"
          :counter="40"
          :rules="firstNameRules"
          label="First Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :counter="40"
          :rules="lastNameRules"
          label="Last Name"
          required
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
            required
          ></v-select>
        </div>
        <v-text-field
          v-model="street"
          label="Street Address"
          :rules="streetRules"
          :counter="128"
          required
        ></v-text-field>
        <v-text-field
          v-model="complement"
          :counter="128"
          label="Unit/Apt"
          :rules="[v => v.length <= 128 || 'Unit/Apt must be less than 128 characters']"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :counter="128"
          label="E-mail"
          required
        ></v-text-field>

        <v-btn
          class="mr-4"
          @click="sendContact()"
        >
          submit
        </v-btn>
      </form>
      <v-alert
        v-if="this.status !== null"
        dismissible
        :type="status === 200 ? 'success' : 'error'"
      >{{this.status === 200 ? 'Contant sent successfully' : 'Somethin is wrong'}}
      </v-alert>
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
      status: null,
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
    background-color: #040838;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    .box {
      background-color: #fff;
      height: 100%;
      width: 25%;
      max-width: 400px;
      min-width: 200px;
      padding: 30px;
      // width: 300?px;
    }
  }
</style>

