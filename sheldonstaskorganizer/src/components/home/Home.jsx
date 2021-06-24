import React from 'react';
import Header  from '../header/Header';

const Home = ({currentUser}) => {
  return (
    <div>
     <Header currentUser={currentUser}/>
    </div>
  )
}

export default Home;
