import { AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { IoTrashBin } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Suggested() {
  // CONTEXT
  const { user } = useContext(User);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  // API
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/tagUser/get`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .catch(() => {
          setError("Une erreur est survenue...");
        })
        .then(({ data }) => {
          setTags(data.refusedTags);
        });
    }
  }, [user]);

  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (tags.length === 0) {
      let refusedTags = localStorage.getItem("refusedTags");
      if (refusedTags !== undefined && refusedTags !== null) {
        setTags(JSON.parse(refusedTags));
      }
    } else {
      localStorage.setItem("refusedTags", JSON.stringify(tags));
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
    <div className="refusedTags">
      <div className="titlesTags">
        <h3>Tags refusés ({tags.length})</h3>
        <p onClick={toggleOpen}>
          {isOpen ? <AiOutlineMinus /> : <HiOutlinePlus />}
        </p>
      </div>
      {isOpen &&
        tags.map((tag) => {
          return (
            <div className="tag-content" key={tag.id}>
              <div className="bin-tag">
                <IoTrashBin />
              </div>
              <div className="text-tag">#{tag.name}</div>
              <div className="check-tag">
                <BsFillCheckCircleFill />
              </div>
            </div>
          );
        })}
    </div>
  );
}
