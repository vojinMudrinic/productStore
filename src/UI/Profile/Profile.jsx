import React from "react";
// Local imports
import styles from "./Profile.module.css";

const Profile = ({ image, handleDropdown }) => {
  return (
    <div className={styles.container} onClick={handleDropdown}>
      <img src={image} alt={"profile_picture"} />
    </div>
  );
};

export default Profile;
