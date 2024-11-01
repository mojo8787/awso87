<template>
  <div class="container">
    <Authenticator>
      <template v-slot="{ user, signOut }">
        <header>
          <h1>Welcome, {{ user.attributes?.email || user.username }}</h1>
          <button @click="signOut" class="sign-out-button">Sign Out</button>
        </header>
        <Notes />
      </template>
    </Authenticator>
  </div>
</template>

<script>
import { Authenticator } from '@aws-amplify/ui-vue';
import Notes from './components/Notes.vue';

export default {
  components: {
    Authenticator,
    Notes,
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sign-out-button {
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.sign-out-button:hover {
  background-color: #ff0000;
}
</style>
