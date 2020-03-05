import React, { useContext } from "react";
import { RoomContext } from "../context";

export default function FeaturedRooms() {
  const rooms = useContext(RoomContext).roomState.featuredRooms;
  console.log(rooms);
  return <div></div>;
}
