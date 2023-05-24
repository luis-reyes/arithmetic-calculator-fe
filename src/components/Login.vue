<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header mid">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  v-model="username"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/register" class="btn btn-link">Register</router-link>
            </div>
            <div v-if="message" class="alert mt-3" :class="messageClass">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '', // Message to display
      messageClass: '', // CSS class for the message
    };
  },
  methods: {
    ...mapMutations(['setLoggedIn']),
    login() {
      const loginData = {
        username: this.username,
        password: this.password,
      };
      
      const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
      
      // Make a POST request to the login endpoint
      fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (response.ok) {
            // Login successful
            return response.json();
          } else if (response.status === 401) {
            // Unauthorized, display error message
            throw new Error('Invalid username or password');
          } else {
            // Login failed
            throw new Error('An error occurred during login');
          }
        })
        .then((data) => {
          const accessToken = data.access_token;
          this.$cookies.set('access_token', accessToken); // Store the access token in a cookie

          this.setLoggedIn(true);
          this.$router.push({ name: 'Transactions' });
        })
        .catch((error) => {
          // Display the error message
          this.message = error.message;
          this.messageClass = 'alert-danger';
        });
    },
  },
};
</script>

<style scoped>
.alert {
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
