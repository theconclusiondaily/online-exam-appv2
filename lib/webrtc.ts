import Peer from "simple-peer";

export function createPeer(

  initiator: boolean,

  stream: MediaStream,

) {

  return new Peer({

    initiator,

    trickle: false,

    stream,
  });
}
