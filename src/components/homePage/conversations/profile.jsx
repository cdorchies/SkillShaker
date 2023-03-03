import Menu from "./menuProfile";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Profile() {
  const [infos, setInfos] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useContext(User);
  // console.log(infos);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/info`, {
          headers: {
            Authorization: "Bearer " + user.token, //the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          setInfos(data);
        });
    }
  }, []);

  return (
    <div className="profileSection">
      <div className="list">
        <ul>
          <li>
            <div className="profile user">
              <div className="picture">
                <img
                  src="https://picsum.photos/50/50"
                  alt="Photo de profil"
                  className="profilePicture"
                />
              </div>
              <div className="informationsSection">
                <div className="informations">
                  <p className="name">{infos.firstname}</p>
                  <p className="email">{infos.email}</p>
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
