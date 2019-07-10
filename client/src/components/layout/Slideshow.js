import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';

const slides = [
  {
    id: 0,
    url:
      'photo-1431794062232-2a99a5431c6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1650&q=2'
  },
  {
    id: 1,
    url: 'photo-1493962621260-74cc5a3baf89?ixlib=rb-1.2.1&w=1650&q=2'
  },
  {
    id: 2,
    url: 'photo-1508144753681-9986d4df99b3?ixlib=rb-1.2.1&w=1650&q=2'
  },
  {
    id: 3,
    url: 'photo-1508182314998-3bd49473002f?ixlib=rb-1.2.1&w=1650&q=2'
  }
];

const Slideshow = () => {
  const [index, set] = useState(0);

  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  });

  useEffect(() => {
    const changeImage = setInterval(() => {
      set(state => (state + 1) % 4);
    }, 6000);
    return () => clearInterval(changeImage);
  }, []);
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      className="bg"
      style={{
        ...props,
        backgroundImage: `url(https://images.unsplash.com/${
          item.url
        }&auto=format&fit=crop)`
      }}
    />
  ));
};

export default Slideshow;
