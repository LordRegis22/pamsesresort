import React from "react";
import { RoomConsumer } from "../context";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import Loading from "./Loading";

export default function RoomContainer() {
  return (
    <RoomConsumer>
      {value => {
        console.log(value);
        const { loading, sortedRooms, rooms } = value;
        if (loading) {
          return <Loading />;
        } else {
          return (
            <>
              <RoomFilter rooms={rooms} />
              <RoomList rooms={sortedRooms} />
            </>
          );
        }
      }}
    </RoomConsumer>
  );
}
