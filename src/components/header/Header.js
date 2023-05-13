import logo from "./images/logo.png";
import Profile from "./images/profile.png";
import ProfileStore from "./images/profile_boss.png";
import { useState } from "react";
import login from "../Login";
import { Link } from "react-router-dom";
import UserOption from "../user_option/UserOption";
import OwnerOption from "../owner_option/OwnerOption";
import styled from "styled-components";
import { useUserInfoDispatch, useUserInfoState } from "../../context/UserInfoContext";

const Logo = styled.img`
  margin-top: 1em;
  height: 3em;
  margin-left: 4em;
`;

const Top = styled.div`
  height: 6em;
  margin: 0px;
  display: flex;
  background-color: #ffe6c7;
  justify-content: space-between;
  width: 100vw;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: bolder;
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
  color: white;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  height: 3em;
  background: #ffa559;
  border-radius: 23px;
  display: flex;
  font-family: "Montserrat";
  font-style: normal;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const BtnHeader = styled.button`
  border-radius: 20%;
  // border: 1px black solid;
  color: white;
  font-fammily: monospace;

  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  height: 3.5em;
  background: #ffa559;
  font-weight: 900;
  border-radius: 23px;
  display: flex;
  font-family: "Montserrat";
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const Toggle = styled(BtnHeader)`
  background-color: rgb(253, 234, 234);
  border: transparent;

  height: 3.6em;
  //display: block;
  width: 15em;

  margin-right: -0.5em;
  color: grey;
  justify-content: center;
  align-items: center;
  position: relative;
  & > .customerTog {
    display: inline-block;

    & > img {
      position: absolute;
      height: 2.9em;
      left: 2%;
      transition: all 0.2s ease-in;

      top: 10%;
    }
  }
  & > p {
    display: block;
    width: 1em;
  }
  & > .bossTog {
    display: inline-block;

    & > img {
      position: absolute;
      transition: all 0.2s ease-in;

      height: 2.9em;
      top: 7%;

      left: 80%;
    }
  }
`;

const Wallet = styled(BtnHeader)`
  border-radius: 23px;
  width: 13em;
  border: transparent;
  /* border-radius: 20%; */
  box-shadow: none;
  padding-left: 1em;
  justify-content: center;
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
  const [clicked, setClicked] = useState(false);
  const userState=useUserInfoState();
  const userDispatch=useUserInfoDispatch();

  function alterner() {
    !userState.isOwner  ? userDispatch({type:"SWITCH_OWNER"}) : userDispatch({type:"SWITCH_USER"})
    console.log(userState.isOwner)
  }
  const onClick = () => {
    setClicked((clicked) => !clicked);
  };
  const loggedIn = async () => {
    const token=await login();
    userDispatch({type:"LOGIN",address:token.address,coin:token.coin});
  };
  
  const button=
    userState.isOwner ? 
    <div className="bossTog">
      <p>&nbsp;I want to serve</p>
      <img src={ProfileStore} alt="profileStore" />
    </div>
  : 
    <div className="customerTog">
      <p>&nbsp;&nbsp;I want to reserve</p>
      <img src={Profile} alt="profile" />
    </div>
  return (
    <Top>
      <Link to={"/"}>
        <Logo src={logo} alt="logo"></Logo>
      </Link>
      <RightSide>
        <DivHeader>
          <Wallet onClick={userState.login ? onClick : loggedIn}>
            {userState.login ?
            `${userState.address.substr(0,5)}
            ...
            ${userState.address.substr(userState.address.length-5)}
            : ${userState.coin} BNB `: "Connect Binance Wallet"}
          </Wallet>

          <Toggle type="button" isactive={userState.isOwner.toString()} onClick={userState.login ? alterner : loggedIn}>
              {button}
          </Toggle>
        </DivHeader>
      </RightSide>
      {/* 수정 */}
      {userState.login && clicked ? (userState.isOwner ? <OwnerOption/> : <UserOption/>): <></>}
    </Top>
  );
}

export default Header;
