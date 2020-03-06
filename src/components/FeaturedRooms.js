import React, { useContext } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default function FeaturedRooms() {
  let rooms = useContext(RoomContext).featuredRooms;
  let loading = useContext(RoomContext).loading;
  return (
    <section className="featured-rooms">
      <Title title="Featured Rooms" />
      <div className="featured-rooms-center">
        {loading ? (
          <Loading />
        ) : (
          rooms.map(room => <Room key={room.id} room={room} />)
        )}
      </div>
    </section>
  );
}
