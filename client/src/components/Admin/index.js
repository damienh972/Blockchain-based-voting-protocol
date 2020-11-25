import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Voting from '../../contracts/Voting.json';

const Admin = (account, contract) => {
  console.log(account.account);
  console.log(Voting);
  const [address, setAddress] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState(null);

  const addWhitelist = async (addressValue) => {
    // Interaction avec le smart contract pour ajouter un compte
    await account.contract.methods.addVoter(addressValue).send({ from: account.account });
    // Récupérer la liste des comptes autorisés
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmittedAddress(address);
    console.log(submittedAddress);
    addWhitelist(address);
  };
  const handleChange = (evt, value) => {
    setAddress(value.value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Voter address</label>
          <Form.Input
            placeholder="Enter address"
            value={address}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Admin;
