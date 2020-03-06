import React, { useState } from "react";
import Title from "../components/Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaPaw } from "react-icons/fa";

export default function Services() {
  const [services] = useState([
    {
      icon: <FaCocktail />,
      title: "Free Cocktails",
      info:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab neque id iusto illo laudantium soluta."
    },
    {
      icon: <FaHiking />,
      title: "Hike your face off!",
      info:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab neque id iusto illo laudantium soluta."
    },
    {
      icon: <FaShuttleVan />,
      title: "Sit on a bus!",
      info:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab neque id iusto illo laudantium soluta."
    },
    {
      icon: <FaPaw />,
      title: "Meet Pamses",
      info:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab neque id iusto illo laudantium soluta."
    }
  ]);
  return (
    <section className="services">
      <Title title="Services"></Title>
      <div className="services-center">
        {services.map((service, index) => {
          return (
            <article key={index} className="service">
              <span>{service.icon}</span>
              <h6>{service.title}</h6>
              <p>{service.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
