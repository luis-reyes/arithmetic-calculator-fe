<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>

    <!-- Success Message -->
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
    
    <!-- Button to go back to login -->
    <button class="btn btn-secondary mt-3" @click="goToLogin">Go back to login</button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      const userData = {
        username: this.username,
        password: this.password,
      };
      const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
      fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Registration successful. Please log in.';
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          } else {
            throw new Error('Registration failed.');
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
