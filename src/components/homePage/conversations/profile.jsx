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
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      Cookies.remove("auth_token");
      Cookies.remove("datas");
    }
    toast.info(`Déconnexion...`);
    window.location.href = "/";
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
  const [error, setError] = useState(null);

  async function fetchData() {
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL}/user/info`, {
        headers: {
          Authorization: "Bearer " + user.token, //the token is a variable which holds the token
        },
      })
      .catch(() => {
        setError("Une erreur est survenue...");
      });
    setInfos(response.data);
  }

  // COOKIES
  // Cookies.set("datas", infos, { expires: 7 });
  const authToken = Cookies.get("auth_token");
  // const datas = Cookies.get("datas");
  // console.log(datas)

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, []);

  if (error) {
    return (
      <div>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </div>
    );
  }

  // const imageProfile = `https://api.skill-shaker.com/api/user/info/${infos.image}`;

  return (
    <>
      <div>
        <div className="list">
          <ul>
            <li>
              <div className="profile user">
                <div className="picture">
                  <img
                    src="https://picsum.photos/70/70"
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
