<template>
  <div class="hello">
    <section class="make-center">
      <button @click="openRoom">Open Room</button>
      <button @click="joinRoom">Join Room</button>

      <ul id="vue-app">
        <li
          v-for="item in videosList"
          :key="item.id"
        >
          {{item}}
          <video
      controls
      autoplay
      playsinline
      :srcObject.prop="item.srcObject"
      :muted="item.muted"
      :id="item.id"
    ></video> 
        </li>
      </ul>

      <div
        id="room-urls"
        style="text-align: center;display: none;background: #F1EDED;margin: 15px -10px;border: 1px solid rgb(189, 189, 189);border-left: 0;border-right: 0;"
      ></div>
    </section>


  </div>
</template>

<script>
import RTCMultiConnection from 'rtcmulticonnection'

var connection = new RTCMultiConnection()
// by default, socket.io server is assumed to be deployed on your own URL

connection.socketURL = '/'
// comment-out below line if you do not have your own socket.io server
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

connection.socketMessageEvent = 'video-conference-demo'
connection.session = {
  audio: true,
  video: true
}

connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true
}

connection.autoCreateMediaElement = false

export default {
  name: 'hello',
  data () {
    return {
      videosList: []
    }
  },
  mounted () {
    connection.onstream = event => {
      this.videosList.push({
        id: event.streamid,
        srcObject: event.stream,
        muted: event.type === 'local'
      })
    }
    connection.onstreamended = event => {
      var newList = []
      this.videosList.forEach((item) => {
        if (item.id !== event.streamid) {
          newList.push(item)
        }
      })
      this.videosList = newList
    }
  },
  methods: {
    openRoom () {
      connection.open('room1', () => {
        console.log(connection.sessionid)
      })
    },
    joinRoom () {
      connection.join('room1')
    }
  }
}
</script>

<style scoped>

</style>
