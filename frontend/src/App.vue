<template>
  <v-app>
    <v-main>
      <ContactUs/>
    </v-main>
  </v-app>
</template>

<script>
import ContactUs from './components/ContactUs';

export default {
  name: 'App',

  components: {
    ContactUs,
  },

  data: () => ({
    //
  }),
};
</script>
