<template>
  <header>
    <router-link to="/">
      <h1>whisp.</h1>
    </router-link>
    <div v-if="currentUser" class="btns">
      <router-link :to="`/user/${currentUser.uid}`">
        <button :style="`background-image: url(${currentUser.photoURL})`"></button>
      </router-link>
      <button @click="signOut">
        <fa icon="sign-out-alt" />
      </button>
    </div>
    <div v-else class="btns">
      <button>
        <fa icon="user" @click="signIn" />
      </button>
    </div>
  </header>
</template>
<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../main'
import { addDoc, collection, query, getDocs, where, setDoc, doc } from "firebase/firestore"; 
export default {
  methods:{
    async signIn () {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      await signInWithPopup(auth, provider)
        .then((result) => {
          this.createUser(result.user)
          this.$router.push(`/user/${result.user.uid}`)
        }).catch((error) => {
          console.error(error)
        })
    },
    signOut () {
      const auth = getAuth()
      if (window.confirm('Are You Sure to Sign Out?')) {
        auth.signOut()
        .then(() => {
          alert('You Safely Signed Out.')
          if(this.$route.name !== "/") this.$router.push("/")
        })
      }
    },
    async createUser (user) {
      try {
        // userはidをuidに指定
          const docRef = doc(db, "users",user.uid)
          const data = {
            'name': user.displayName,
            'photoURL': user.photoURL,
            'email':user.email,
            'uid':user.uid
          };
          await setDoc(docRef, data)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
  data () {
    return {
      currentUser: "" 
    }
  },
  created () {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
}
</script>
<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
    button
      display: flex
      justify-content: center
      align-items: center
</style>
