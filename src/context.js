import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();
const RoomConsumer = RoomContext.Consumer;

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    // this.getData();
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    //transform values (value returned as string changed to number)
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //filter by capacity
    if (capacity !== "all") {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size <= maxSize && room.size >= minSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };

// function RoomProvider(props) {
//   const [roomState, setRoomState] = useState({
//     rooms: [],
//     featuredRooms: [],
//     loading: true,
//     type: "all",
//     capacity: 1,
//     price: 0,
//     minPrice: 0,
//     maxPrice: 0,
//     minSize: 0,
//     maxSize: 0,
//     breakfast: false,
//     pets: false
//   });
//   const [sortedRooms, setSortedRooms] = useState(formatData(items));

//   useEffect(() => {
//     let rooms = formatData(items);
//     let featuredRooms = rooms.filter(room => room.featured === true);
//     let maxPrice = Math.max(...rooms.map(item => item.price));
//     let maxSize = Math.max(...rooms.map(item => item.size));
//     setRoomState({
//       rooms: rooms,
//       featuredRooms: featuredRooms,
//       type: "all",
//       capacity: 1,
//       loading: false,
//       price: 0,
//       maxPrice: maxPrice,
//       minPrice: 0,
//       maxSize: maxSize,
//       minSize: 0,
//       breakfast: false,
//       pets: false
//     });
//     setSortedRooms(rooms);
//   }, []);

//   function formatData(items) {
//     let tempItems = items.map(item => {
//       let id = item.sys.id;
//       let images = item.fields.images.map(image => image.fields.file.url);
//       let room = { ...item.fields, images, id };
//       return room;
//     });
//     return tempItems;
//   }

//   function getRoom(slug) {
//     let tempRooms = [...roomState.rooms];
//     const room = tempRooms.find(room => room.slug === slug);
//     return room;
//   }

//   function handleChange(event) {
//     console.log("change");
//     const value =
//       event.type === "checkbox" ? event.target.checked : event.target.value;
//     const name = event.target.name;
//     let newKeyValue = { [name]: value };
//     setRoomState({
//       ...roomState,
//       ...newKeyValue
//     });
//     console.log(roomState);
//     filterRooms();
//   }

//   function filterRooms() {
//     let {
//       rooms,
//       type,
//       capacity,
//       price,
//       minSize,
//       maxSize,
//       breakfast,
//       pets
//     } = roomState;

//     let tempRooms = [...rooms];
//     if (type !== "all") {
//       tempRooms = tempRooms.filter(item => type === item.type);
//     } else {
//       setSortedRooms(tempRooms);
//     }
//     console.log(tempRooms);
//     setSortedRooms(tempRooms);
//     console.log(sortedRooms);
//     console.log("filtered");
//   }

//   return (
//     <RoomContext.Provider
//       value={{
//         roomState,
//         sortedRooms,
//         getRoom: getRoom,
//         handleChange: handleChange
//       }}
//     >
//       {props.children}
//     </RoomContext.Provider>
//   );
// }

// export { RoomProvider, RoomConsumer, RoomContext };
