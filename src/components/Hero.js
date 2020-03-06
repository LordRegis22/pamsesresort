import React from "react";

export default function Hero({ children, heroClass }) {
  return <header className={heroClass}>{children}</header>;
}

Hero.defaultProps = {
  heroClass: "defaultHero"
};
