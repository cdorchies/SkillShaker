import { MdSend } from "react-icons/md";

import React from "react";

export default function Message() {
  return (
    <>
      <input
        type="text"
        name="message"
        id="SkillShaker-Send-Message"
        value="Rédiger un message..."
      />{" "}
      <MdSend />
    </>
  );
}
