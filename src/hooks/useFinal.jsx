import { duduYesQuestions } from '@/utilities/data';
import { useState, useEffect } from 'react';

const useFinal = (step, message) => {
  const [finalMessage, setFinalMessage] = useState('La pasaremos super');
  const [finalImage, setFinalImage] = useState('/gifts/dudu_flower_2.gif');
  const [background, setBackground] = useState('url(/images/background_mobile.jpg)');
  
  useEffect(() => {
    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log('Image loaded', url);
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    const changeBackground = async (newBackground) => {
      await preloadImage(newBackground);
      setBackground(`url(${newBackground})`);
    };

    if (step === duduYesQuestions.length + 2) {
      setTimeout(async() => {
        setFinalMessage('Capaz comamos');
        setFinalImage('/gifts/food.gif');
        await changeBackground('/images/cena.jpeg');
      }, 5000);
  
      setTimeout(() => {
        setFinalMessage('Capaz bailemos');
        setFinalImage('/gifts/dance.gif');
        changeBackground('/images/disco.jpg');
      }, 9000);
      
      setTimeout(() => {
        setFinalMessage('Pero lo más importante es que la pasaremos juntos');
        setFinalImage('/gifts/hug.gif');
        changeBackground('/images/background.jpg');
      }, 13000);

      setTimeout(() => {
        setFinalMessage(message);
        setFinalImage('/gifts/final.gif');
      }, 17000);
    }
  }, [step, message]);

  return {
    finalMessage,
    finalImage,
    background,
  };
};

export default useFinal;
