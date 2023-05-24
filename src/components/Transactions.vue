<template>
  <div class="transactions container">
    <h2>Transactions</h2>
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="operation-filter">Operation:</label>
        <select id="operation-filter" class="form-control" v-model="selectedOperation" @change="loadTransactions">
          <option value="">All</option>
          <option v-for="operation in operations" :key="operation.id" :value="operation.id">{{ operation.type }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="items-per-page">Items Per Page:</label>
        <select id="items-per-page" class="form-control" v-model="itemsPerPage" @change="changeItemsPerPage">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
    <button class="btn btn-primary" @click="loadTransactions">Refresh Data</button>
    <router-link class="btn btn-secondary" to="/calculator">Go to Calculator</router-link>

    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Date</th>
          <th>Operation Type</th>
          <th>Operation Response</th>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.operation.type }}</td>
          <td>{{ transaction.operation_response }}</td>
          <td>{{ transaction.user.username }}</td>
          <td>
            <button class="btn btn-danger" @click="confirmDelete(transaction.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button class="btn btn-secondary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span class="mx-3">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
export default {
  data() {
    return {
      transactions: [],
      operations: [],
      selectedOperation: "",
      currentPage: 1, // Track the current page
      totalPages: 0,
      itemsPerPage: 10, // Default items per page
    };
  },
  mounted() {
    this.loadOperations();
    this.loadTransactions();
  },
  methods: {
    confirmDelete(transactionId) {
      if (confirm("Are you sure you want to delete this transaction?")) {
        this.deleteTransaction(transactionId);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadTransactions();
      }
    },
    goToCalculator() {
      this.$router.push({ name: 'Calculator' });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadTransactions();
      }
    },
    loadOperations() {
      const headers = {
        Authorization: `Bearer ${this.$cookies.get('access_token')}`,
      };
      // Make a GET request to the operations endpoint
      fetch(`${API_BASE_URL}/api/v1/operations/`, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          this.operations = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadTransactions() {
      const headers = {
        Authorization: `Bearer ${this.$cookies.get('access_token')}`,
      };
      // Prepare the query parameters
      const params = new URLSearchParams();
      params.append("page", this.currentPage); // Use the current page value
      params.append("per_page", this.itemsPerPage);

      if (this.selectedOperation) {
        params.append("operation_id", this.selectedOperation);
      }

      // Make a GET request to the transactions endpoint with query parameters
      fetch(`${API_BASE_URL}/api/v1/transactions/?${params.toString()}`, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          this.transactions = data.transactions;
          this.totalPages = data.total_pages;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteTransaction(transactionId) {
      const headers = {
        Authorization: `Bearer ${this.$cookies.get('access_token')}`,
      };
      // Make a DELETE request to the delete transaction endpoint
      fetch(`${API_BASE_URL}/api/v1/transactions/${transactionId}`, {
        headers: headers,
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove the deleted transaction from the list
            this.transactions = this.transactions.filter(
              (transaction) => transaction.id !== transactionId
            );
          } else {
            throw new Error("Failed to delete transaction");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeItemsPerPage() {
      this.loadTransactions(); // Reload transactions with the updated items per page value
    },
  },
};
</script>

<style scoped>
.transactions {
  max-width: 800px;
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.btn {
  margin-right: 0.5rem;
}

</style>
