import React, { useState} from 'react';

export default function Spinner({ isLoading }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoading) {
    setTimeout(() => setIsLoaded(true), 450);
  }

  return (
    <div className={'spinner ' + (isLoading ? 'spinner--show' : 'spinner--hide') + (isLoaded ? ' spinner--none' : '')}>
      <div className='spinner__stars'></div>
      <div className='spinner__stars-2'></div>
      <div className='spinner__stars-3'></div>
      <div className='spinner__title'>Patience you must have my young Padawan.. (Data is loading..)</div>
    </div>
  );
}
