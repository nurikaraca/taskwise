"use client"
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation'; 
const AnimatedText = () => {

  return (
    
    <TypeAnimation
    className='text-sky-600 opacity-[0.5]'
      sequence={[
        'Welcome to TASKWISE', // Types 'One'
         2000, // Waits 1s
         '', // Deletes 'One' and types 'Two'
         500, // Waits 2s
        // 'I say are you  ready', // Types 'Three' without deleting 'Two'
         () => {
           console.log('Sequence completed');
         },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '4em', display: 'inline-block' }}
    />
  );
};


export default AnimatedText;