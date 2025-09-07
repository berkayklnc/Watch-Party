import {useNavigate} from "react-router-dom";
import React, { useState} from "react";



export default function Home() {
    const navigate = useNavigate();
    const [userName,setUserName] = useState(localStorage.getItem('userName') || "")
    const [userNameModal, setUserNameModal]   = useState(true)
    const createRoom = () => {
        if (userName){
        const roomId = crypto.randomUUID();
        navigate(`/room/${roomId}`);
        }
        setUserNameModal(false);
    };
    function handleSubmit(e:any) {
        e.preventDefault();
        localStorage.setItem('userName', userName)
        createRoom()
    }
    function handleChange(e:any) {
        setUserName(e.target.value);
    }
    return (
        <>{userNameModal ?
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Video Sync</h1>
            <button onClick={createRoom} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Oda Kur
            </button>
        </div>:
        <div>Username gir.
            <form onSubmit={handleSubmit} action="">
                <input value={userName}
                       onChange={handleChange}
                       type="text"/>
                <input type="submit"/>
            </form>

        </div>

        }
        </>
    );
};

