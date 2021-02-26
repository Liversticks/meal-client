import React from 'react';

const SOURCE_URL = 'https://github.com/Liversticks/meal-client';

function Footer() {
  return (
    <div className="mt-3 mb-3 text-center">
      Made by Liversticks. Check out the source code
      <a href={SOURCE_URL}>here.</a>
    </div>
  );
}

export default Footer;
