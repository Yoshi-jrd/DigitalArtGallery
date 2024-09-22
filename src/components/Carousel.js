import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

// function Carousel({ images }) {
//     return (
//       <div style={{ height: '100%', backgroundColor: 'green' }}>
//         Test Carousel
//         {images.map((image, index) => (
//           <img key={index} src={image} alt={`Carousel image ${index}`} style={{ width: '100%', visibility: 'hidden' }} />
//         ))}
//       </div>
//     );
//   }
// export default Carousel  

function Carousel({ images }) {
  const [index, setIndex] = useState(0);
  const [props, set] = useSprings(images.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block'
  }));

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2) {
      const newIndex = index + (xDir > 0 ? -1 : 1);
      if (newIndex >= 0 && newIndex < images.length) {
        setIndex(newIndex);
      }
      cancel();
    }
    // Update springs with new indexes immediately in response to the user's drag
    set(i => ({
      x: (i - index) * window.innerWidth + (down ? mx : 0),
      scale: down ? 1.1 : 1,
      display: 'block'
    }));
  });

  return (
    <div className="relative w-full h-full overflow-hidden">
      {props.map(({ x, display, scale }, i) => (
        <animated.div
          {...bind()}
          key={i}
          style={{
            display,
            transform: x.to(x => `translate3d(${x}px,0,0) scale(${scale})`),
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[i]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  );
}

export default Carousel;
