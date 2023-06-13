import React from 'react';
import GrantList from './GrantList';

// Mock data
const grants = [
  {id: 1, name: "Grant 1", description: "This is grant 1"},
  {id: 2, name: "Grant 2", description: "This is grant 2"},
  {id: 3, name: "Grant 3", description: "This is grant 3"},
  // more grants...
];

const Home = () => {
  return (
    <div>
      <h1>Welcome to SeedMoney</h1>
      <GrantList grants={grants} />
    </div>
  );
};

export default Home;
