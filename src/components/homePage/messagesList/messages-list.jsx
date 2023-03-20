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

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (messages.length === 0) {
      let messageFeed = localStorage.getItem("messageFeed");
      if (messageFeed != undefined || messageFeed != null) {
        setMessages(JSON.parse(messageFeed));
      }
    } else {
      localStorage.setItem("messageFeed", JSON.stringify(messages));
    }
  } else {
    console.log("Erreur....");
  }

  if (error) {
    return (
      <div>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </div>
    );
  }

  // STYLISER LES TAGS
  messages.forEach((message) => {
    let string = message.message;
    const regex = /#\w+/g;
    let motsHashtags = string.match(regex);
    let newTag = string.replace(
      string,
      `<span className="messageTag">${motsHashtags}</span>`
    );
  });

  const regex = /#\w+/g;

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
                  {/* <p>{message.message.match(regex)}</p> */}
                </div>
                <div className="peopleTags">
                  <div className="peopleFollowing">
                    <BsPeopleFill />{" "}
                    {message.conversation ? message.conversation.length : "0"}/
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
        <div>
          <p className="no-new-messages">Aucun nouveau message...</p>
        </div>
      )}
    </div>
  );
}
