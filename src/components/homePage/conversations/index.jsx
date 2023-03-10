import Profile from "./profile";
import List from "./list";

export default function Conversations() {
  return (
    <div id="conversations">
      <div className="profileSection">
        <Profile />
        <List />
      </div>
    </div>
  );
}
