"use client";
import React, { useEffect, useState } from "react";
import FriendListHeader from "./FriendListHeader";
import SearchForm from "./SearchForm";
import FriendItemContainer from "./FriendItemContainer";

const LeftSideBar = ({ session }: any) => {
  const [friends, setFriends] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      if (searchName !== "") {
        setFriends([]);
        const response = await fetch(
          `/api/friend/search?target=${searchName}&user=${
            session.user.email.split("@")[0]
          }`
        );
        const data = await response.json();
        setFriends(data);
      } else {
        const response = await fetch(
          `/api/friend?user=${session.user.email.split("@")[0]}`
        );
        const data = await response.json();
        setFriends(data);
      }
    };

    fetchFriends();
  }, [searchName]);

  return (
    <>
      <FriendListHeader />
      <SearchForm setSearchName={setSearchName} />
      <FriendItemContainer data={friends} session={session} />
    </>
  );
};

export default LeftSideBar;
