<template>
  <v-container class="form-container">
    <v-row justify="center">
      <v-col lg="4" md="6" sm="8" class="form-wrapper">
        <RegisterForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'blank',
}
</script>

<style>
.form-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-wrapper {
  margin: 0 25px;
}
.form-wrapper.not-toggled {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-nav {
  display: flex;
  justify-content: space-between;
}
.form-nav > a {
  text-decoration: none;
  color: #7f828b !important;
  font-size: 12px;
  line-height: 12px;
}
</style>
