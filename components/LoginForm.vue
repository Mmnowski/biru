<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.email.value"
      :rules="form.email.rules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="form.password.value"
      :append-icon="form.password.show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="form.password.rules"
      :type="form.password.show ? 'text' : 'password'"
      label="Password"
      @click:append="togglePasswordVisibility()"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mt-4" block @click="login">
      LOGIN
    </v-btn>
    <v-container class="form-nav mt-3">
      <NuxtLink to="/register">Don't have an account?</NuxtLink>
      <NuxtLink to="/forgot-password">Forgot password</NuxtLink>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form: {
      password: {
        value: '',
        rules: [(v) => !!v || 'Field is required'],
      },
      email: {
        value: '',
        rules: [(v) => !!v || 'Field is required'],
        show: false,
      },
    },
  }),
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    async login() {
      if (this.validate()) {
        const formData = {}
        Object.keys(this.form).forEach(
          (key) => (formData[key] = this.form[key].value)
        )
        console.log(formData)
        await this.$fire.authReady()
        await this.$fire.auth
          .signInWithEmailAndPassword(formData.email, formData.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            // ..
          })
      }
    },
    togglePasswordVisibility() {
      this.$set(this.form.password, 'show', !this.form.password.show)
    },
  },
}
</script>

<style scoped></style>
