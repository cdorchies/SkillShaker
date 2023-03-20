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

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  // API
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  async function fetchData() {
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL}/tagUser/get`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .catch(() => {
        setError("Une erreur est survenue...");
      });
    setTags(response.data.suggTags);
  }


  // LOCAL STORAGE
  if (typeof Storage !== "undefined") {
    if (tags.length === 0) {
      let suggestedTags = localStorage.getItem("suggestedTags");
      if (suggestedTags != undefined || suggestedTags != null) {
        setTags(JSON.parse(suggestedTags));
      }
    } else {
      localStorage.setItem("suggestedTags", JSON.stringify(tags));
    }
  } else {
    console.log("Erreur....");
  }

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

  return (
    <div className="suggestedTags">
      <div className="titlesTags">
        <h3>Tags suggérés ({tags.length})</h3>
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
