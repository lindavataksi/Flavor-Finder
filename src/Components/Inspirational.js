import React from 'react';
import chef from './chef.png';

export default function Inspirational () {
  return (
    <section className='inspirational--block'>
      <div className='inspirational--blurb'>
        <h1> Everyone can be a chef <br />in their own kitchen. </h1>
        <p>Unleash your inner chef with our collection of quick and delightful recipes, tailored for every home cook. From simple weeknight dinners to indulgent desserts, discover the joy of creating delicious meals right in your own kitchen.</p>
      </div>
      <div>
        {/* <div className="inspirational--emojis">
          <img className="inspirational--emoji--salad" alt="salad" src="https://i.pinimg.com/originals/89/2d/77/892d7792a45521431ef85f5f67071fac.png" />
          <img className="inspirational--emoji--steak" alt="steak" src="https://em-content.zobj.net/source/apple/114/cut-of-meat_1f969.png" />
          <img className="inspirational--emoji--broccoli" alt="broccoli" src="https://em-content.zobj.net/source/emojipedia/91/broccoli_1f966.png" />
          <img className="inspirational--emoji--onion" alt="" src="https://em-content.zobj.net/source/apple/271/onion_1f9c5.png" />
        </div> */}
        {/* <img className="inspirational--chef" alt= "chef" src="https://i.pinimg.com/originals/b0/65/3d/b0653d1fa0df085a3d5bae9cbf2b1c21.png" /> */}
        <img className="inspirational--chef" alt= "chef" src={chef} />
      </div>
    </section>
  );
}
