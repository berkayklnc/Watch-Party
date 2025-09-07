const socket = io("ws://localhost:4000");
const roomId = document.querySelector("#roomId")
let isRemoteSeek = false;
let video = document.querySelector("video");

window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type === "FROM_REACT") {
        console.log("ID:", event.data.id);
        socket.emit("join-room", event.data.id);
    }
});


if (video) {
    console.log("Video bulundu!");

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

        video.addEventListener("seeked", (data) => {
            if (isRemoteSeek) {
                isRemoteSeek = false;
                return;
            }
            console.log("süre atladı",data)
            socket.emit("video:seek", {
                roomId: roomId.value,
                currentTime: video.currentTime
            });
        });

        socket.on("video:play", (data) => {
            console.log("server videoyu başlattı",data)
            video.currentTime = data;
            video.play();
        });

        socket.on("video:pause", (data) => {
            console.log("server videoyu durdurdu", data)
            video.currentTime = data;
            video.pause();
        });

        socket.on("video:seek", (data) => {
            console.log("server videoyu atlattı" , data)
            isRemoteSeek = true;
            video.currentTime = data;
        });
        if (roomId.value){
            console.log(roomId.value)
            socket.emit("join-room", roomId.value);
        }
    })

} else {
    console.log("Sayfada video bulunamadı.");
}
