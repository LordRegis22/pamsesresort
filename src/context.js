import React, { useState, useEffect } from "react";
import items from "./data";

const RoomContext = React.createContext();
const RoomConsumer = RoomContext.Consumer;

function RoomProvider(props) {
  const [roomState, setRoomState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  });

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    setRoomState({ rooms, featuredRooms, sortedRooms: rooms, loading: false });
  }, []);

  function formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  return (
    <RoomContext.Provider value={{ roomState }}>
      {props.children}
    </RoomContext.Provider>
  );
}

export { RoomProvider, RoomConsumer, RoomContext };
