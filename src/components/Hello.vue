<template>
  <div>
    <p>A page using <a href="https://github.com/muaz-khan/RTCMultiConnection">RTCMultiConnection</a> try opening this page on a few different machines.</p>
    <div
      v-for="item in videosList"
      :key="item.id"
    >
      <video
        controls
        autoplay
        playsinline
        :srcObject.prop="item.srcObject"
        :muted="item.muted"
        :id="item.id"
      ></video>
    </div>

    <div>PTT: {{ptt}}</div>
  </div>
</template>

<script>

import RTCMultiConnection from 'rtcmulticonnection'

export default {
  name: 'video-conference-demo',
  data () {
    return {
      videosList: [],
      ptt: 'off'
    }
  },
  mounted () {
    const connection = new RTCMultiConnection()
    connection.socketURL = '/'
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
    connection.onstream = event => {
      this.videosList.push({
        id: event.streamid,
        srcObject: event.stream,
        muted: event.type === 'local'
      })
    }
    connection.onstreamended = event => {
      const newList = this.videosList.filter(item => item.id !== event.streamid)
      this.$set(this, 'videosList', newList)
    }
    connection.openOrJoin('video-conference-demo-room', function (isRoomExist, roomid) {
      console.log(connection.sessionid, connection.isInitiator, isRoomExist, roomid)
    })

    connection.socket.on('news', (data) => {
      this.ptt = data.ptt
      console.log('data', data)
    })
  }
}
</script>
