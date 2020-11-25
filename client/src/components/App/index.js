import React, { useState, useEffect } from 'react';
import {
  BrowserRouter
  as
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Nav from '../Nav';
import WinningProposal from '../WinningProposal';
import Admin from '../Admin';
import Vote from '../Vote';
import Home from '../Home';
import ProposalRegistration from '../ProposalRegistration';
import Whitelist from '../Whitelist';
import getWeb3 from '../../getWeb3';
import Voting from '../../contracts/Voting.json';

// import Admin from './admin.js';

import './app.scss';

const App = () => {
  const [web3S, setWeb3S] = useState(null);
  const [accountsS, setAccountsS] = useState(null);
  const [contractS, setContractS] = useState(null);
  const [whitelistS, setWhitelistS] = useState(null);

  async function init() {
    try {
      // Récupérer le provider web3
      const web3 = await getWeb3();
      console.log(web3);
      setWeb3S(web3);

      // Utiliser web3 pour récupérer les comptes de l’utilisateur (MetaMask dans notre cas)
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);

      setAccountsS(accounts[0]);
      // Récupérer l’instance du smart contract “Voting” avec web3
      // et les informations du déploiement du fichier (client/src/contracts/Voting.json)
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];

      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContractS(instance);
      console.log(accountsS);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        'Non-Ethereum browser detected. Can you please try to install MetaMask before starting.',
      );
      console.error(error);
    }
  }
  // useEffect(() => {
  //   init();
  // }, []);
  init();

  const getWhitelist = async () => {
    // récupérer la liste des comptes autorisés
    const whitelist = await contractS.methods.getAddresses().call();
    // Mettre à jour le state
    setWhitelistS(whitelist);
    return whitelistS;
  };

  if (!web3S) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  if (contractS) {
    return (
      <Router>
        <div>
          <Nav />
        </div>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/admin">
              <Admin
                account={accountsS}
                contract={contractS}
              />
            </Route>
            <Route exact path="/proposal-registration">
              <ProposalRegistration />
            </Route>
            <Route exact path="/voting">
              <Vote />
            </Route>
            <Route exact path="/winning-proposal">
              <WinningProposal />
            </Route>
            <Route exact path="/whitelist">
              <Whitelist />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  return null;
};

export default App;
