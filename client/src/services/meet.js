let localStream;
let remoteStream;
let peerConnection;

/*
  Stun server
*/
const servers = {
    iceServers: [
        {
            urls: ['stun:stun.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
} 

/*
  Local stream
*/
export async function startStreamUser1() {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  document.getElementById("user-1").srcObject = localStream;

  createOffer();
}

/*
  Peer connection
*/
export async function createOffer() {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream)
  })

  peerConnection.ontrack = (e) => {
    e.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack();
    })
  }

  peerConnection.onicecandidate = async (e) => {
    if(e.candidate) {
        console.log("New ICE candidate: ", e.candidate)
    }
  }

  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log(offer)
}
