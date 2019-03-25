<template>
  <div >
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
  </div>
</template>

<script>
import RTCMultiConnection from 'rtcmulticonnection'

export default {
  name: 'hello',
  data () {
    return {
      videosList: []
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
      const newList = []
      this.videosList.forEach(item => {
        if (item.id !== event.streamid) newList.push(item)
      })
      this.$set(this, 'videosList', newList)
    }
    connection.openOrJoin('room1', function (isRoomExist, roomid) {
      if (isRoomExist === false && connection.isInitiator === true) {
        console.log(connection.sessionid)
      }
    })
  }
}
</script>
