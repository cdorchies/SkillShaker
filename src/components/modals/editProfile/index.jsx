import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { CgPhone } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import "./index.scss";

// CONTEXT
import User from "../../../contexts/userContext";

export default function ProfileForm({ isOpen, onClose }) {
  const { user } = useContext(User);
  const [infos, setInfos] = useState([]);
  const [error, setError] = useState("");

  // GET
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

  // EDIT
  const editMyprofil = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/edit`, infos, {
        headers: {
          Authorization: "Bearer " + user.token, //the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        setInfos(data);
        toast.success(
          `${infos.firstname}, vos modifications ont bien été prises en compte !`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error(`Une erreur est survenue, veuillez réessayer...`);
        setError("Une erreur est survenue, veuillez réessayer...");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div id="editProfile">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <form action="" id="Form-Profil">
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div>
            <label htmlFor="firstname">
              <BsFillPersonFill /> <span className="span-edit-profile">Nom d'utilisateur</span>
              <input
                className="edit-input"
                type="text"
                name="firstname"
                value={infos.firstname}
                onChange={(e) =>
                  setInfos({ ...infos, firstname: e.target.value })
                }
                placeholder={infos.firstname}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phoneNumber">
              <CgPhone /> <span className="span-edit-profile">Numéro de téléphone</span>
              <input
                className="edit-input"
                type="text"
                name="phoneNumber"
                value={infos.phoneNumber}
                onChange={(e) =>
                  setInfos({ ...infos, phoneNumber: e.target.value })
                }
                placeholder={infos.phoneNumber}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <MdDescription /> <span className="span-edit-profile">Description</span>
              <textarea
                className="description-bloc"
                name="description"
                cols="30"
                rows="10"
                value={infos.description}
                onChange={(e) =>
                  setInfos({ ...infos, description: e.target.value })
                }
                placeholder={infos.description}
              ></textarea>
            </label>
          </div>
          <div className="input-submit-edit">
            <input type="submit" value="Modifier" onClick={editMyprofil} />
          </div>
        </form>
      </div>
    </div>
  );
}
