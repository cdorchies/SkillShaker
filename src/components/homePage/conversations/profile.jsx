import axios from "axios";
import Modal from "../../modals/editProfile/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Profile() {
  // CONTEXT
  const { user, setUser } = useContext(User);

  // MENU - DECONNEXION
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogOut = () => {
    setUser(null);
    Cookies.remove("auth_token");
    toast.info(`Déconnexion...`);
    navigate("/");
  };

  // MENU - MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // ROUTER NAVIGATE
  const navigate = useNavigate();

  // API
  const [infos, setInfos] = useState([]);

  async function fetchData() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/info`,
      {
        headers: {
          Authorization: "Bearer " + user.token, //the token is a variable which holds the token
        },
      }
    );
    setInfos(response.data);
  }

  useEffect(() => {
    // setTimeout(() => {
    if (user) {
      fetchData();
    }
    // }, 1000);
  }, []);

  return (
    <>
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
                    {/* substr à faire ici  */}
                    <p className="email">{infos.description}</p>
                  </div>
                  <div
                    className="profileIcon"
                    onClick={() => setOpenMenu((prev) => !prev)}
                  >
                    <HiDotsVertical />
                    {openMenu && (
                      <>
                        <ul className="menuProfile">
                          <li>
                            <button type="button" onClick={handleModalOpen}>
                              Mon profil
                            </button>
                          </li>
                          <li>
                            <button type="button" onClick={handleLogOut}>
                              Déconnexion
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}
