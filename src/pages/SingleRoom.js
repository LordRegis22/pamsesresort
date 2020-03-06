import React, { useState, useContext } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import { FaPaw, FaUser, FaUsers, FaUtensils } from "react-icons/fa";

export default function SingleRoom(props) {
  const [singleRoomState] = useState({
    slug: props.match.params.slug,
    defaultBcg
  });
  const getRoom = useContext(RoomContext).getRoom;

  const room = getRoom(singleRoomState.slug);
  if (!room) {
    return (
      <StyledHero>
        <div className="error">
          <h3>No such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            Back to rooms
          </Link>
        </div>
      </StyledHero>
    );
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;

  const [mainImg, ...defaultImg] = images;
  return (
    <>
      <StyledHero img={mainImg}>
        <Banner title={`${name} Room`}>
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((url, index) => {
            return <img key={index} src={url} alt={name} />;
          })}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>Price: ${price}</h6>
            <h6>Size: {size} SQFT</h6>
            <h6>
              {capacity > 1 ? <FaUsers /> : <FaUser />} Maximum{" "}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>
              {pets ? (
                <>
                  <FaPaw /> Pets allowed
                </>
              ) : (
                "No pets allowed"
              )}
            </h6>
            <h6>
              {breakfast && (
                <>
                  <FaUtensils /> Free breakfast included
                </>
              )}
            </h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>Extras</h6>
        <ul className="extras">
          {extras.map((item, index) => {
            return <li key={index}>- {item}</li>;
          })}
        </ul>
      </section>
    </>
  );
}
