import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MAX_HEARTS = 10; // Máximo número de corazones a mostrar

const Hearts = () => {
  const [hearts, setHearts] = useState([]);
  const [heartsCount, setHeartsCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * (window.innerWidth - 100)) + 50;
      const y = Math.floor(Math.random() * (window.innerHeight - 100)) + 50;
      const id = Date.now();

      if (heartsCount < MAX_HEARTS) {
        // Agregar un nuevo corazón si no hemos alcanzado el límite
        setHearts(prevHearts => [...prevHearts, { id, x, y }]);
        setHeartsCount(prevCount => prevCount + 1);
      } else {
        // Si hemos alcanzado el límite, eliminamos el corazón más antiguo
        setHearts(prevHearts => prevHearts.slice(1).concat({ id, x, y }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [heartsCount]); // Dependencia agregada para actualizar el efecto cuando cambia heartsCount

  return (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" id="canvas">
{hearts.map(({ id, x, y }, index) => (
  <motion.g
    key={`${id}-${index}`}
    animate={{
      opacity: [0, 1, 0], 
      scale: [0.5, 1, 0.5] // Ajusta los valores de escala para simular el latido
    }}
    transition={{ duration: 1, repeat: Infinity }}
    initial={{ opacity: 0, scale: 0.5 }} // Escala inicial
    transform={`translate(${x}, ${y})`}
  >
    <use xlinkHref="#heart" />
  </motion.g>
))}
      <defs>
        <g id="heart">
          <g>
            <g>
              <path className="o_heart" d="M102.7,12.4L102.7,12.4C90.5,0.2,71.3-1,57.7,8.8c-13.6-9.9-32.9-8.7-45.2,3.5l0,0 c-13.6,13.6-13.6,35.8,0,49.3L48.8,98c1.8,1.8,4,2.9,6.3,3.3c3.9,0.9,8.2-0.1,11.2-3.2l36.3-36.3C116.2,48.2,116.2,26,102.7,12.4 z" />
            </g>
          </g>
          <g>
            <g>
              <path className="i_heart" d="M74.7,34L74.7,34c-4.6-4.6-11.9-5.1-17.1-1.4c-5.2-3.8-12.5-3.3-17.1,1.3c-5.1,5.1-5.1,13.6,0,18.7 l13.8,13.8c0.7,0.7,1.5,1.1,2.4,1.3c1.5,0.3,3.1-0.1,4.2-1.2l13.8-13.8C79.9,47.6,79.9,39.2,74.7,34z" />
            </g>
          </g>
        </g>
      </defs>
    </svg>
  );
};

export default Hearts;
