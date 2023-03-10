import { HiDotsVertical } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import Menu from "./menuMessage";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function MessagesList() {
  // CONTEXT
  const { user } = useContext(User);
  const [openMenu, setOpenMenu] = useState(false);

  // API
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/message/get/feed`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          const dataArray = Object.values(res.data.messages);
          setMessages(dataArray);
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        });
    }
  }, []);

  if (error) {
    return (
      <div>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </div>
    );
  }
  return (
    <div id="messagesUsers">
      {messages ? (
        messages.map((message, index) => {
          return (
            <div className="messageUser" key={index}>
              <div className="profilePic">
                <img
                  src="https://picsum.photos/70/70"
                  alt="Photo de profil"
                  className="profilePicture"
                />
              </div>
              <div className="messageBody">
                <div className="infosUser">
                  <div className="infoUserName">{message.author_firstname}</div>
                  <div className="hourMessage">
                    {message.created_at.date.slice(11, 16)}{" "}
                    <span onClick={() => setOpenMenu((prev) => !prev)}>
                      <HiDotsVertical />
                    </span>
                    {openMenu && <Menu value={index} />}
                  </div>
                </div>
                <div className="fullMessage">
                  <p>{message.message}</p>
                </div>
                <div className="peopleTags">
                  <div className="peopleFollowing">
                    <BsPeopleFill /> {message.conversation.length}/
                    {message.audience}
                  </div>
                  <div className="sendMessage">
                    <RiMessage2Fill />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Aucun nouveau message</div>
      )}
    </div>
  );
}
