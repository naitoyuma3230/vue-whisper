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

import firebase from "firebase";
import { initializeApp } from "firebase/app"; // firebase/appモジュールをインポート
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"; // firestoreをインポート
Vue.config.productionTip = false;
Vue.component("fa", FontAwesomeIcon);
library.add(faUser, faSignOutAlt, faEllipsisV);

const firebaseConfig = {
	apiKey: "AIzaSyAVbaMi0wv2PwszFHx0I8BNitiYXHydjyo",
	authDomain: "vue-whisper.firebaseapp.com",
	projectId: "vue-whisper",
	storageBucket: "vue-whisper.appspot.com",
	messagingSenderId: "161235616759",
	appId: "1:161235616759:web:9b040367f7f7554650a4f2",
};

firebase.initializeApp(firebaseConfig);

new Vue({
	router,
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
