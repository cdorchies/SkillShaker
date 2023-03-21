import { HiDotsVertical } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import Menu from "./menuMessage";
import Message from "./message";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// import io from "socket.io-client";

// CONTEXT
import User from "../../../contexts/userContext";

export default function MessagesList() {
  // CONTEXT
  const { user } = useContext(User);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
    console.log(openMenu);
  };

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

  return (
    <>
      <div id="messagesUsers">
        <div className="message">
          <Message />
        </div>
        {messages ? (
          messages.map((message, index) => {
            let msg = message.message;
            return (
              <div className="messageUser" key={`message-${index}`}>
                <div className="profilePic">
                  <img
                    src="https://picsum.photos/70/70"
                    alt="Photo de profil"
                    className="profilePicture"
                  />
                </div>
                <div className="messageBody">
                  <div className="infosUser">
                    <div className="infoUserName">
                      {message.author_firstname}
                    </div>
                    <div className="hourMessage">
                      {message.created_at.date.slice(11, 16)}{" "}
                      <span onClick={handleOpenMenu}>
                        <HiDotsVertical />
                      </span>
                      {openMenu && <Menu />}
                    </div>
                  </div>
                  <div className="fullMessage">
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: msg.replace(
                          /#\w+/g,
                          '<span class="hashtag">$&</span>'
                        ),
                      }}
                    ></p>
                  </div>
                  <div className="peopleTags">
                    <div className="peopleFollowing">
                      <BsPeopleFill />{" "}
                      {message.conversation
                        ? message.conversation.map((msg, index) => {
                            return (
                              <span key={index}>{msg.nb_users.toString()}</span>
                            );
                          })
                        : "0"}
                      /{message.audience}
                    </div>
                    {message.conversation ? (
                      <div className="sendMessage">
                        <RiMessage2Fill />
                      </div>
                    ) : null}
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
    </>
  );
}
