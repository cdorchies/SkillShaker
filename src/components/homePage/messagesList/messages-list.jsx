import { HiDotsVertical } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import Menu from "./menuMessage";
import { useState } from "react";

export default function MessagesList() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="messagesUsers">
      <div className="profilePic">
        <img
          src="https://picsum.photos/70/70"
          alt="Photo de profil"
          className="profilePicture"
        />
      </div>
      <div className="messageBody">
        <div className="infosUser">
          <div className="infoUserName">Gilles</div>
          <div className="hourMessage">
            14:06{" "}
            <span onClick={() => setOpenMenu((prev) => !prev)}>
              <HiDotsVertical />
            </span>
            {openMenu && <Menu />}
          </div>
        </div>
        <div className="fullMessage">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            ornare eros dui, non sodales purus egestas quis. Fusce aliquet
            tempus tellus, vel bibendum elit lacinia varius. Fusce efficitur
            lorem hendrerit velit ullamcorper pulvinar. In nec sem sit amet quam
            scelerisque sollicitudin sit amet ac nisl. Duis ultrices vitae
            tortor ac tristique. Nunc placerat posuere nunc. Nullam molestie
            molestie tortor et vestibulum. Vivamus eget gravida enim. Sed in
            ante diam. Pellentesque ante diam, semper non auctor tristique,
            euismod et massa. Donec ac tortor felis.
          </p>
        </div>
        <div className="peopleTags">
          <div className="peopleFollowing">
            <BsPeopleFill /> 2/3
          </div>
          <div className="sendMessage">
            <RiMessage2Fill />
          </div>
        </div>
      </div>
    </div>
  );
}
