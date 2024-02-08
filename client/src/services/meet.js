/*
  Stun server
*/
const servers = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

/*
  Peer connection
*/
class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection(servers);
    }
  }

  async getoffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      
      console.log("Offer created: ", offer)

      return offer;
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      // Log for debugging
      console.log('Setting remote description:', offer);

      // Set remote description with the provided offer
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));

      // Create an answer
      const ans = await this.peer.createAnswer();

      // Log for debugging
      console.log('Answer SDP:', ans);

      // Set local description with the created answer
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));

      // Return the answer as RTCSessionDescription
      return new RTCSessionDescription(ans);
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async closePeerConnection(socketId) {
    console.log("Leaing call: ", socketId )
    console.log("Leaing call after: ", this.peer )

    if (this.peer) {
      this.peer.close();
      delete this.peer;
    }
  }
}

const peerService = new PeerService();

export default peerService;
