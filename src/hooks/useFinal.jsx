import { useState, useEffect } from 'react';

const useFinal = (step, message) => {
  const [finalMessage, setFinalMessage] = useState('La pasaremos super');
  const [finalImage, setFinalImage] = useState('/gifts/dudu_flower_2.gif');
  
  useEffect(() => {
    if (step === 6) {
      setTimeout(() => {
        setFinalMessage('Capaz comamos');
        setFinalImage('/gifts/food.gif');
      }, 4000);
  
      setTimeout(() => {
        setFinalMessage('Capaz bailemos');
        setFinalImage('/gifts/dance.gif');
      }, 8000);
      
      setTimeout(() => {
        setFinalMessage('Pero lo importante es que la pasaremos juntos');
        setFinalImage('/gifts/hug.gif');
      }, 12000);

      setTimeout(() => {
        setFinalMessage(message);
        setFinalImage('/gifts/final.gif');
      }, 16000);
    }
  }, [step, message]);

  return {
    finalMessage,
    finalImage
  };
};

export default useFinal;
