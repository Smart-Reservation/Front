import { useEffect, useState } from 'react';
import Web3 from 'web3'; //Web3 라이브러리 가져오기

function Login() {
  const [account, setAccount] = useState(); // state variable to set account.
  
  //컴포넌트가 마운트될 때 Web3 인스턴스를 생성하고, 사용자의 지갑 주소를 가져오기
  useEffect(() => {
    async function load() {

      if(window.BinanceChain){ //Binance Smart Chain 지갑 소프트웨어에서 실행되는 경우(객체 존재)
        await window.BinanceChain.enable(); //Binance Smart Chain 네트워크에 연결(사용자의 BSC지갑을 dApp과 연결;지갑 정보에 대한 액세스 권한 요청 )
        //window.BinanceChain 객체는 사용자가 Binance Smart Chain 지갑 소프트웨어를 설치하고, 웹 브라우저에서 해당 소프트웨어를 활성화할 때 생성
        const web3 = new Web3(window.BinanceChain); //Binance Smart Chain 네트워크에 연결된 Web3 Provider 객체 생성
        const accounts = await web3.eth.requestAccounts(); //현재 연결된 네트워크에서 사용자의 지갑 계정 주소 가져오기
        setAccount(accounts[0]);  
      } else{
        alert('Please install Binance Smart Chain wallet'); // Binance Smart Chain 지갑 소프트웨어가 설치되어 있지 않은 경우
      }
    }
    
    load();
   }, []); 
  
   return (
     <div>
       Your account is: {account} 
     </div>
   );
}

export default Login;