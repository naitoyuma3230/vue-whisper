import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faUser,
	faSignOutAlt,
	faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

Vue.config.productionTip = false;
Vue.component("fa", FontAwesomeIcon);
library.add(faUser, faSignOutAlt, faEllipsisV);

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_UD,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

new Vue({
	router,
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
