<template>
  <div class="container">
    <h2>Calculator</h2>
    <div class="form-group">
      <label for="operation-select">Operation:</label>
      <select class="form-control" id="operation-select" v-model="selectedOperation" @change="updateInputFields">
        <option value="">Select an operation</option>
        <option v-for="operation in operations" :key="operation.id" :value="operation.id">{{ operation.type }}</option>
      </select>
    </div>
    <div v-if="isEditableNumber1" class="form-group">
      <label for="num1">Number 1:</label>
      <input class="form-control input-sm" id="num1" v-model="num1" type="number" placeholder="Enter a number">
    </div>
    <div v-if="isEditableNumber2" class="form-group">
      <label for="num2">Number 2:</label>
      <input class="form-control input-sm" id="num2" v-model="num2" type="number" placeholder="Enter a number">
    </div>
    <button class="btn btn-primary" @click="calculate">Calculate</button>
    <div v-if="message" class="result mt-3" :class="messageClass">
      <h3>Result:</h3>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
export default {
  data() {
    return {
      operations: [], // Available operations
      selectedOperation: '', // Selected operation
      num1: null, // First number input
      num2: null, // Second number input
      message: '', // Status message
      messageClass: '', // CSS class for the message
    };
  },
  mounted() {
    this.loadOperations();
  },
  computed: {
    isEditableNumber1() {
      const operation = this.operations.find((op) => op.id === this.selectedOperation);
      return operation && operation.type !== 'random_string';
    },
    isEditableNumber2() {
      const operation = this.operations.find((op) => op.id === this.selectedOperation);
      return operation && operation.type !== 'square_root' && operation.type !== 'random_string';
    },
    isDivisionbyZero() {
      const operation = this.operations.find((op) => op.id === this.selectedOperation);
      console.log(operation)
      return operation && operation.type === 'division' && (this.num2 === null || this.num2 === undefined || this.num2 === 0);
    },
  },
  methods: {
    loadOperations() {
      
      // Make a GET request to the operations endpoint
      fetch(`${API_BASE_URL}/api/v1/operations/`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get('access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.operations = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateInputFields() {
      // Reset input fields when operation selection changes
      this.num1 = null;
      this.num2 = null; 
      this.message = '';
    },
    calculate() {
      if (!this.selectedOperation) {
        this.setMessage('Please select an operation.', 'error');
        return;
      }

      if (
        this.isEditableNumber1 &&
        (this.num1 === null || this.num1 === undefined || this.num1 === '')
      ) {
        this.setMessage('Please enter a valid number for Number 1.', 'error');
        return;
      }

      if (
        this.isEditableNumber2 &&
        (this.num2 === null || this.num2 === undefined || this.num2 === '')
      ) {
        this.setMessage('Please enter a valid number for Number 2.', 'error');
        return;
      }
      if (this.isDivisionbyZero) {
        this.setMessage('Division by zero is not possible.', 'error');
        return;
      }

      const payload = {
        operation_id: this.selectedOperation,
        num_1: Number(this.num1) || 0,
        num_2: Number(this.num2) || 0,
      };

      fetch(`${API_BASE_URL}/api/v1/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$cookies.get('access_token')}`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result && data.result.operation_response) {
            const result = data.result.operation_response;
            this.setMessage(`Result: ${result}`, 'success');
          } else {
            this.setMessage('Calculation failed. Please try again.', 'error');
          }
        })
        .catch((error) => {
          console.error(error);
          this.setMessage('An error occurred. Please try again.', 'error');
        });
    },
    setMessage(message, type) {
      this.message = message;
      this.messageClass = type === 'error' ? 'text-danger' : 'text-success';
    },
  },
};
</script>

<style scoped>
.result {
  margin-top: 1rem;
}
</style>
