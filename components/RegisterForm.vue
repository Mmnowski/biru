<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="togglePasswordVisibility()"
    ></v-text-field>
    <v-text-field
      v-model="password2"
      :error-messages="password2Errors"
      :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword2 ? 'text' : 'password'"
      label="Password"
      required
      @input="$v.password2.$touch()"
      @blur="$v.password2.$touch()"
      @click:append="togglePassword2Visibility()"
    ></v-text-field>
    <v-btn
      :disabled="$v.$invalid"
      color="success"
      class="mt-4"
      block
      @click="register"
    >
      CREATE AN ACCOUNT
    </v-btn>
    <v-container class="form-nav mt-3">
      <NuxtLink :to="{ name: 'login', params: { showForm: 123 } }">{{
        '<- Back to login'
      }}</NuxtLink>
    </v-container>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(10),
      containsUppercase: (value) => {
        return /[A-Z]/.test(value)
      },
      containsLowercase: (value) => {
        return /[a-z]/.test(value)
      },
      containsNumber: (value) => {
        return /[0-9]/.test(value)
      },
      containsSpecial: (value) => {
        return /[#?!@$%^&*-]/.test(value)
      },
    },
    password2: { required, sameAsPassword: sameAs('password') },
  },
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    password2: '',
    showPassword2: false,
  }),
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      console.log('this.$v.email')
      console.log(this.$v.email)
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      console.log('this.$v.password')
      console.log(this.$v.password)
      !this.$v.password.minLength &&
        errors.push('Must be at most 10 characters long')
      !this.$v.password.containsLowercase &&
        errors.push('Must contain a lowercase character')
      !this.$v.password.containsUppercase &&
        errors.push('Must contain an uppercase character')
      !this.$v.password.containsNumber && errors.push('Must contain a number')
      !this.$v.password.containsSpecial &&
        errors.push('Must contain a special character')
      !this.$v.password.required && errors.push('Field is required')
      return errors
    },
    password2Errors() {
      const errors = []
      if (!this.$v.password2.$dirty) return errors
      !this.$v.password2.sameAsPassword && errors.push("Passwords don't match")
      !this.$v.password2.required && errors.push('Field is required.')
      return errors
    },
  },
  methods: {
    validate() {
      this.$v.$touch()
    },
    async register() {
      this.validate()
      if (!this.$v.$invalid) {
        const formData = {}
        formData.email = this.email
        formData.password = this.password
        console.log(formData)
        await this.$fire.authReady()
        await this.$fire.auth
          .createUserWithEmailAndPassword(formData.email, formData.password)
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
      this.showPassword = !this.showPassword
    },
    togglePassword2Visibility() {
      this.showPassword2 = !this.showPassword2
    },
  },
}
</script>

<style scoped></style>
