import logo from "./images/logo.png";
import "./header.css";
import Profile from "./images/profile.png";
import ProfileStore from "./images/profile_boss.png";
import { useState } from "react";
import login from "../Login";
import { Link } from "react-router-dom";
import UserOption from "../user_option/UserOption";
import styled from "styled-components";

const Logo = styled.img`
  height: 7em;
  margin-left: 6em;
`;

const Top = styled.div`
  height: 6em;
  margin: 0px;
  display: flex;
  background-color: #c2c6cc;
  justify-content: space-between;
  width: 100vw;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: space-around;
  margin-right: 5em;
  flex-direction: column;
`;
const DivHeader = styled.div`
  border-radius: 20%;
  border: 1px black solid;
  color: white;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  height: 3em;
  background: #484848;
  border-radius: 23px;
  display: flex;
  font-family: "Montserrat";
  font-style: normal;
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: grab;
  }
`;

const BtnHeader = styled.button`
  border-radius: 20%;
  border: 1px black solid;
  color: white;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  height: 3.5em;
  background: #484848;
  border-radius: 23px;
  display: flex;
  font-family: "Montserrat";
  font-style: normal;
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: grab;
  }
`;
const Toggle = styled(BtnHeader)`
  background-color: rgb(253, 234, 234);
  border: transparent;
  display: block;
  width: 6em;
  margin-right: -0.5em;

  & > .customerTog > img {
    height: 3em;
    margin: 0;
    padding-right: 70%;
    transition: all 0.2s ease-in;
  }
  & > .bossTog > img {
    height: 3em;
    margin: 0;
    padding-left: 40%;
    transition: all 0.2s ease-in;
  }
`;
const Wallet = styled(BtnHeader)`
  border-radius: 23px;
  width: 13em;
  border: transparent;
  /* border-radius: 20%; */
  box-shadow: none;
  padding-left: 1em;
`;
const BtnOut = styled(BtnHeader)`
  border-radius: 23px;
  width: 12em;
  border: transparent;
  /* border-radius: 20%; */
  box-shadow: none;
  padding-left: 1em;
`;

function Header() {
  const [active, setActive] = useState(false);
  let button;
  function alterner() {
    active ? setActive(false) : setActive(true);
  }

  button = active ? (
    <div className="bossTog">
      <img src={ProfileStore} alt="profileStore" />
    </div>
  ) : (
    <div className="customerTog">
      <img src={Profile} alt="profile" />
    </div>
  );

  const [logged, setlogged] = useState(false); //전역적으로 관리
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked((clicked) => !clicked);
  };
  const loggedIn = () => {
    login();
    setlogged(true);
  };
  return (
    <Top>
      <Link to={"/"}>
        <Logo src={logo} alt="logo"></Logo>
      </Link>
      <RightSide>
        <DivHeader>
          <Wallet onClick={logged ? onClick : loggedIn}>
            Connect Binance Wallet
          </Wallet>

          <Toggle type="button" isactive={active.toString()} onClick={alterner}>
            {button}
          </Toggle>
        </DivHeader>
      </RightSide>
      {clicked ? <UserOption /> : <></>}
    </Top>
  );
}

export default Header;
