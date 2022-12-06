<template>
  <div id="user">
    <div class="user-title">
      <div class="avatar" :style="`background-image: url('${user.photoURL}')`"></div>
      <div class="texts">
        <h1>{{user.name}}</h1>
        <p v-if="myWhispers.length > 1">{{myWhispers.length}} whispers</p>
        <p v-else>{{myWhispers.length}} whisper</p>
      </div>
    </div>
    <div class="list">
      <Editor :currentUser="currentUser"/>
      <Item 
        v-for="whisper in myWhispers"
        :key="whisper.id" 
        :id="whisper.id"
        :uid="whisper.data().uid" 
      />
    </div>
  </div>
</template>
<script>
import Item from '@/components/Item.vue'
import Editor from '@/components/Editor.vue'
import { getAuth } from 'firebase/auth'

import { db } from '../main'
import {   
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot  } from "firebase/firestore";


export default {
  components: {
    Item,
    Editor
  },
  data () {
    return {
      user: "",
      myWhispers: [],
      currentUser: "" ,
      unsubscribe: null
    }
  },
  created () {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  mounted: async function(){
    const usersRef  = collection(db, "users");
    // getDocsがFirebaseとの通信となるため、awaitで同期
    await getDocs(query(usersRef, where("uid", "==", this.$route.params.uid))).then(snapshot => {
      snapshot.forEach(doc => {
        this.user = doc.data()
      })
    })
    //   await getDocs(query(whispersRef, where("uid", "==", this.$route.params.uid))).then(snapshot => {
    //   snapshot.forEach(doc => {
    //     this.myWhispers.push(doc)
    //   })
    // })

    // onSnapshotを使用して同期的に取得
      const whispersRef = collection(db, "whispers");
      // whereとorderByで別のフィールド(uidとdate)を使用する場合はCloudFirestoreのインデックスに複合フィールドを作成する
      const q = query(whispersRef, where("uid", "==", this.$route.params.uid), orderBy('date','desc'))
      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        const myWhispers= []
          querySnapshot.forEach((doc) => {
              myWhispers.push(doc)
          });
        this.myWhispers = myWhispers
      });
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
  .avatar
    width 50px
    height 50px
    border-radius 5px
    background-size cover
  .texts
    margin-left 10px
    h1
      font-size 1.5rem
      margin 0
    p
      font-size .8rem
      margin 0
</style>