import { HiDotsVertical } from "react-icons/hi";
import Menu from "./menuConversations";
import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function List() {
  // CONTEXT
  const { user } = useContext(User);
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // API
  const [setConversations] = useState([]);
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
  }, [user, setConversations]);

  // if (error) {
  //   return (
  //     <div>
  //       <p>Une erreur est survenue... réessayez plus tard !</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <h2>Conversations</h2>
      <div className="list" ref={ref}>
        <ul>
          <li>
            <div className="profile">
              <div className="picture">
                <img
                  src="https://picsum.photos/50/50"
                  alt=""
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
    </>
  );
}
