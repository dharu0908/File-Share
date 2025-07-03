import { useState } from "react";
import Navbar from "./navbar";
import Send from "./send";
import Received from "./received";
import Upload from "./upload";
import Homehome from "./homehome";
import Profile from "./profile";
import UploadList from "./uploadlist";
import SendList from "./SendList";
import Auth from "./auth";

const Home = () => {
  const [selectfun, setFunction] = useState("");

  const setSelect = () => {
    switch (selectfun) {
      case "Send":
        return <Send />;
      case "Received":
        return <Received />;
      case "Upload":
        return <Upload />;

      case "Home":
        return <Homehome />;

      case "Profile":
        return <Profile onSelect={setFunction} />;

      case "UploadList":
        return <UploadList />;

      case "SendList":
        return <SendList />;

      case "Login":
        return <Auth />;

      default:
        return <Homehome />;
    }
  };
  return (
    <div className="home">
      <Navbar onSelect={setFunction} />
      <hr />
      <div className="container">{setSelect()}</div>
    </div>
  );
};

export default Home;
