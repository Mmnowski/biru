<template>
  <v-container class="form-container">
    <v-row justify="center">
      <v-col
        lg="4"
        md="6"
        sm="8"
        :class="{ 'form-wrapper': true, 'not-toggled': !loginSelected }"
      >
        <template v-if="!loginSelected">
          <v-btn
            :disabled="!isOnline"
            color="success"
            class="mt-4"
            block
            @click="getAccountType(true)"
          >
            LOG IN WITH YOUR ACCOUNT
          </v-btn>
          <span class="my-4">or</span>
          <v-btn color="warning" block @click="getAccountType(false)">
            USE GUEST ACCOUNT
          </v-btn>
        </template>
        <template v-else>
          <LoginForm />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'blank',
  data: () => ({
    loginSelected: false,
    isOnline: false,
  }),
  mounted() {
    if (this.$nuxt._route.params.showForm) this.loginSelected = true
    window.addEventListener('online', this.checkConnection)
    window.addEventListener('offline', this.checkConnection)
    this.checkConnection()
  },
  beforeDestroy() {
    window.removeEventListener('online', this.checkConnection)
    window.removeEventListener('offline', this.checkConnection)
  },
  methods: {
    checkConnection() {
      if (navigator.onLine) {
        this.isReachable(this.getServerUrl()).then((online) => {
          if (online) {
            this.isOnline = true
          } else {
            this.isOnline = false
          }
        })
      } else {
        this.isOnline = false
      }
    },
    isReachable(url) {
      /**
       * Note: fetch() still "succeeds" for 404s on subdirectories,
       * which is ok when only testing for domain reachability.
       *
       * Example:
       *   https://google.com/noexist does not throw
       *   https://noexist.com/noexist does throw
       */
      return fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(function (resp) {
          return resp && (resp.ok || resp.type === 'opaque')
        })
        .catch(function (err) {
          console.warn('[conn test failure]:', err)
        })
    },
    getServerUrl() {
      // TODO Add env based base url
      return window.location.origin
    },
    getAccountType(shouldUseOnlineAccount) {
      if (shouldUseOnlineAccount) {
        this.loginSelected = true
      } else {
        // TODO Generate a guest account
        console.log('guesting')
      }
    },
  },
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
