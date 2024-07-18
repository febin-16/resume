import React, { useState, useEffect } from 'react';
import '../../styles/hero.css'; // Assuming you have a CSS file named App.css for styling

function TextScramble({ phrases =null}){
  const [text, setText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frameRequest;
    let frame = 0;
    let queue = [];
    let resolve;

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      setText(output);
      if (complete === queue.length) {
        resolve();
      } else {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    const randomChar = () => {
      return chars[Math.floor(Math.random() * chars.length)];
    };

    const setTextScramble = (newText) => {
      const oldText = text;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((_resolve) => (resolve = _resolve));
      queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(frameRequest);
      frame = 0;
      update();
      return promise;
    };

    setTextScramble(phrases[0]);
  }, []); 


  return <h1 className="w-full text text-center absolute top-24 md:top-[60%] pt-4 md:pt-8 text-[12px] md:text-[30px] " dangerouslySetInnerHTML={{ __html: text }} style={{ fontFamily: 'azonix',color:'#FBF0C2' }} />;
};

export default TextScramble;

