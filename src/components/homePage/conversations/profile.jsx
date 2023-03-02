import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Menu from "./menuProfile";

export default function Profile() {
  const [openMenu, setOpenMenu] = useState(false);
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
                  <p className="name">Caro</p>
                  <p className="email">cdorchies@itroom.fr</p>
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
