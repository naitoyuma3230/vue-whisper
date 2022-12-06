<template>
  <div class="home">
    <div class="list">
      <Item v-for="whisper in whispers" :key="whisper.id" :id="whisper.id" :uid="whisper.data().uid" />
    </div>
  </div>
</template>

<script>
import {  db } from '../main' 
import { 
  collection,
  orderBy,
  onSnapshot,
  query  } from "firebase/firestore";
import Item from "@/components/Item.vue"

export default {
  name: 'home',
  components: {
    Item
  }, 
  data () {
    return {
      whispers: [],
      unsubscribe: null
    }
  },
  mounted: async function(){
    // const querySnapshot = getDocs(collection(db, "whispers"));

    // querySnapshot.forEach((doc) => {
    //   this.whispers.push(doc)
    //   console.log(doc.id, "=>", doc)
    // })

      // onSnapshotを使用して同期的に取得
      const q = query(collection(db, "whispers"), orderBy('date','desc'));
      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        const whispers= []
          querySnapshot.forEach((doc) => {
              whispers.push(doc)
          });
        this.whispers = whispers
      });
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}

</script>

<style lang="stylus" scoped>
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px
</style>