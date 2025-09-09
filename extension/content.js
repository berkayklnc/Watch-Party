const socket = io("ws://localhost:4000");
const roomId = document.querySelector("#roomId")
let isRemoteSeek = false;
let video = document.querySelector("video");
let chatbox = document.querySelector("#chatbox")
window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.source === "FROM_REACT") {
        if (event.data.action === "join_room") {
            console.log(event)
            socket.emit("join-room", event.data);
        }
        else if (event.data.action === "send_message"){
            if (chatbox){
                let p = document.createElement("p")
                p.textContent=event.data.payload
                chatbox.appendChild(p)
            }
            socket.emit("chat_message", event.data);
        }
    }
});


if (video) {

    window.addEventListener('load', function () {

        video.addEventListener("play", () => {
            socket.emit("video:play", {
                roomId: roomId.value,
                currentTime: video.currentTime
            });
        });

        video.addEventListener("pause", () => {
            socket.emit("video:pause", {
                roomId: roomId.value,
                currentTime: video.currentTime
            });
        });

        video.addEventListener("seeked", () => {
            if (isRemoteSeek) {
                isRemoteSeek = false;
                return;
            }
            socket.emit("video:seek", {
                roomId: roomId.value,
                currentTime: video.currentTime
            });
        });

        socket.on("video:play", (data) => {
            video.currentTime = data;
            video.play();
        });

        socket.on("video:pause", (data) => {
            video.currentTime = data;
            video.pause();
        });

        socket.on("video:seek", (data) => {
            isRemoteSeek = true;
            video.currentTime = data;
        });

        socket.on("chat_message", (data) => {
            console.log("chat",data.message)
            if (chatbox){
                let p = document.createElement("p")
                p.textContent=data
                chatbox.appendChild(p)
            }
        });
        if (roomId.value){
            console.log(localStorage.getItem('userName'))
            socket.emit("join-room", roomId.value,localStorage.getItem('userName'));
        }
    })

} else {
}
