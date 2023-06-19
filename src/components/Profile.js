import React, { useContext } from "react";
import Header from "./Header";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { AccountTab } from "./AccountTab";
import { ResetPasswordTab } from "./ResetPasswordTab";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Header />
      <div className="mx-16">
        <Tabs
          activeTab="1"
          className="mt-16"
          ulClassName=""
          activityClassName="bg-success"
        >
          <Tab
            title="Account"
            class="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            {user ? <AccountTab user={user} /> : ""}
          </Tab>

          <Tab
            title="Reset Password"
            class="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            {user ? <ResetPasswordTab user={user} /> : ""}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
