import axios from "axios";
import Modal from "../../modals/editProfile/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useContext, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Profile() {
  // CONTEXT
  const { user, setUser } = useContext(User);

  // MENU - DECONNEXION
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef(null);

  const handleLogOut = () => {
    setUser(null);
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      Cookies.remove("auth_token");
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
  const [infos, setInfos] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL}/user/info`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .catch(() => {
        setError("Une erreur est survenue...");
      });
    setInfos(response.data);
  }

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, []);

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (infos === undefined || infos === null) {
      let infoGet = localStorage.getItem("info");
      if (infoGet != undefined || infoGet != null) {
        setInfos(JSON.parse(infoGet));
      }
    } else {
      localStorage.setItem("info", JSON.stringify(infos));
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

  const imageProfile = infos
    ? `https://api.skill-shaker.com/api/user/info/${infos.image}`
    : "https://picsum.photos/70/70";

  // console.log(imageProfile);

  return (
    <>
      <div className="background-profile"></div>
      <div className="profile user" ref={ref}>
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
        <div className="picture">
          <img
            src="https://picsum.photos/70/70"
            alt="Photo de profil"
            className="profilePicture"
          />
        </div>
        <div className="informationsSection">
          <div className="informations">
            <p className="name">{infos ? infos.firstname : "None"}</p>
            <p className="email">{infos ? infos.description : "None"}</p>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
}
