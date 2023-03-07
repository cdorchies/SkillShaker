import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

// CONTEXT
import User from "../../../contexts/userContext";

export default function ProfileForm({ isOpen, onClose }) {
  const { user } = useContext(User);
  const navigate = useNavigate();
  const [infos, setInfos] = useState([]);
  const [isEdit, setIsEdit] = useState({
    firstname: "",
    phoneNumber: "",
    description: "",
  });
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
      .post(`${process.env.REACT_APP_API_URL}/user/edit`, isEdit, {
        headers: {
          Authorization: "Bearer " + user.token, //the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        setIsEdit(data);
        toast.success(
          `${infos.firstname}, vos modifications ont bien été prises en compte !`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // navigate(`/hp`);
      })
      .catch(() => {
        toast.error(`Une erreur est survenue, veuillez réessayer...`);
        setError("Une erreur est survenue, veuillez réessayer...");
      });
  };

  if (!isOpen) return null;

  return (
    <div id="editProfile">
      <button className="modal-close" onClick={onClose}>
        X
      </button>
      <form action="" id="Form-Profil">
        {error !== "" ? <div className="error">{error}</div> : ""}
        <div>
          <label htmlFor="firstname">
            Nom d'utilisateur
            <input
              type="text"
              name="firstname"
              onChange={(e) =>
                setIsEdit({ ...isEdit, firstname: e.target.value })
              }
              placeholder={infos.firstname}
            />
          </label>
        </div>
        <div>
          <label htmlFor="phoneNumber">
            Numéro de téléphone
            <input
              type="text"
              name="phoneNumber"
              onChange={(e) =>
                setIsEdit({ ...isEdit, phoneNumber: e.target.value })
              }
              placeholder={infos.phoneNumber}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              cols="30"
              rows="10"
              onChange={(e) =>
                setIsEdit({ ...isEdit, description: e.target.value })
              }
              placeholder={infos.description}
            ></textarea>
          </label>
        </div>
        <div>
          <input type="submit" value="Modifier" onClick={editMyprofil} />
        </div>
      </form>
    </div>
  );
}
