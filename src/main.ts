import { createApp } from 'vue';
import App from './App.vue';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-vue/styles.css';

Amplify.configure(outputs);

createApp(App).mount('#app');
