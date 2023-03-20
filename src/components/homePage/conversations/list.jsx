import { HiDotsVertical } from "react-icons/hi";
import Menu from "./menuConversations";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function List() {
  // CONTEXT
  const { user } = useContext(User);
  const [openMenu, setOpenMenu] = useState(false);

  // API
  const [conversations, setConversations] = useState([]);
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
          const dataArray = Object.values(res.data);
          setConversations(dataArray);
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        });
    }
  }, []);

  // conversations.forEach((element) => {
  //   // element.forEach((el) => {
  //   console.log(element);
  //   // });
  // });

  // if (conversations.length === 0) {
  //   let messageFeed = Cookies.get("messageFeed");
  //   if (messageFeed != undefined || messageFeed != null) {
  //     setConversations(JSON.parse(messageFeed));
  //   }
  // } else {
  //   Cookies.set("messageFeed", JSON.stringify(conversations), { expires: 7 });
  // }

  if (error) {
    return (
      <div>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Conversations</h2>
      <div className="list">
        <ul>
          <li>
            <div className="profile">
              <div className="picture">
                <img
                  src="https://picsum.photos/50/50"
                  alt="Photo de profil"
                  className="profilePicture"
                />
              </div>
              <div className="informationsSection">
                <div className="informations">
                  <p className="name">
                    User <span className="hourLastMessage">14:05</span>
                  </p>
                  <p className="tags-conversations">#skillshaker</p>
                  <p className="msg">Message.........</p>
                </div>
                <div
                  className="profileIcon"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <HiDotsVertical />
                  {openMenu && <Menu />}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
