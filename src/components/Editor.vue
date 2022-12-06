<!-- Editor.vue -->

<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="`background-image: url(${currentUser ? currentUser.photoURL: ''})`"></div>
      <p class="user-name">{{currentUser ? currentUser.displayName : ""}}</p>
    </div>
    <div class="editor">
      <textarea placeholder="new whisper" v-model="newWhisper" @keypress.enter="createWhisper">
      </textarea>
      <p class="message">Press Enter to Whisper</p>
    </div>
  </li>
</template>

<script>
import { db } from '../main'
import { collection, addDoc } from "firebase/firestore"; 
export default {
  props: {
    currentUser:{
      typeof:Object
    }
  },
  data () {
    return {
      newWhisper: ''
    }
  },
  methods: {
    // firestoreへ新規作成
    async createWhisper () {
      try {
        const date = new Date()
        const docRef = collection(db, "whispers")
        const data = {
          'content': this.newWhisper,
          'date': date, 
          'uid': this.currentUser.uid
        }
        await addDoc(docRef,data).then(
          this.newWhisper = ''
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
}
</script>
