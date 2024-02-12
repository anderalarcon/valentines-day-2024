'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

import {
  finalMessage,
  duduYesQuestions,
  duduNoQuestions,
  initialImage,
  finalImage,
  duduYesImages,
  duduNoImages,
  initialQuestion,
  defaultImage,
  yesButtonTexts,
  noButtonTexts,
} from '../utilities/data';

import { variants, item } from '@/utilities/framer-motion';

const Home = () => {
  const [answer, setAnswer] = useState('no');
  const [step, setStep] = useState(0);
  const [hoverButton, setHoverButton] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'Dudu';
  const to = searchParams.get('to') || 'Bubu';

  const [name] = useTypewriter({
    words: [`Hola ${to}, te acaba de llegar un mensaje de ${from}, ¿quieres abrirlo?`],
    typeSpeed: 70,
    loop: 1
  });

  const handleConfetti= () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };


  const handleAnswer = (value) => {
    if (value === 'si') {
      handleConfetti();
    }
    setHoverButton(value);
    setAnswer(value);
    setStep(step + 1);
  };

  const getTextByStep = () => {
    let question;
    if (step === 0) {
      return (
        <motion.p
          variants={item}
          className={styles.valentin__content__title}>
          {name}
        </motion.p>
      );
    } else if (step === 1){
      question = initialQuestion;
    } else if (step === duduYesQuestions.length + 2) {
      question = finalMessage;
    } else {
      question = answer === 'si' ? duduYesQuestions[step - 2] : duduNoQuestions[step - 2];
    }

    return (
      <motion.p
        variants={item}
        className={styles.valentin__content__title}>
        {question}
      </motion.p>
    );
  };

  const getImageByStep = () => {
    let imageSrc;
    if (step === 0) {
      imageSrc = initialImage;
    } else if (step === 1){
      imageSrc = defaultImage;
    } else if (step === duduYesQuestions.length + 2) {
      imageSrc = finalImage;
    } else {
      imageSrc = answer === 'si' ? duduYesImages[step - 2] : duduNoImages[step - 2];
    }

    return (
      <motion.img
        className={styles.valentin__content__image}
        variants={item}
        src={imageSrc}
        width={400}
        height={400}
        alt="Dudu flores"
      />
    );
  };

  const getButtons = () => {
    if (step === duduYesImages.length + 2) {
      return null;
    }

    if (step === 0) {
      return (
        <motion.button
          className={styles.valentin__content__buttons_yes}
          onClick={() => handleAnswer('')}
          whileHover={{ scale: 1.2 }}
          variants={item}
        >
          Abrir
        </motion.button>
      );
    }

    const getYesButtonText = () => {
      if (step === 2) {
        return answer === 'si' ? 'Segurísima/o' : 'Está bien...';
      }

      if (step === 3) {
        return answer === 'si' ? '¡Que si!' : 'Me convenciste';
      }

      if (step === 4) {
        return answer === 'si' ? 'Claro que quiero' : 'Ya caí';
      }

      if (step === 5) {
        return answer === 'si' ? 'Ahí estaré' : 'Está bien...';
      }

      return yesButtonTexts[step - 1];
    };

    const getNoButtonText = () => {
      if (step === 2) {
        return answer === 'si' ? 'Me haces dudar' : 'No';
      }

      if (step === 3) {
        return answer === 'si' ? 'Ya no' : 'Que no';
      }

      if (step === 4) {
        return answer === 'si' ? 'Ya no' : 'Ash...';
      }

      if (step === 5) {
        return answer === 'si' ? 'TBD' : 'Me secuestran';
      }

      return noButtonTexts[step - 1];
    };

    return (
      <div className={styles.valentin__content__buttons}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className={styles.valentin__content__buttons_yes}
          onClick={() => handleAnswer('si')}
          onHoverStart={() => setHoverButton('si')}
          variants={item}
        >
          {getYesButtonText()}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className={styles.valentin__content__buttons_no}
          onClick={() => handleAnswer('no')}
          onHoverStart={() => setHoverButton('no')}
          variants={item}

        >
          {getNoButtonText()}
        </motion.button>
      </div>
    );
  };

  const getEmoticon = () => {
    if (step === 0) {
      return null;
    }

    const getSrc = () => {
      if (hoverButton === 'si') {
        return '/gifts/emoticon_happy.gif';
      }

      if (hoverButton === 'no') {
        return '/gifts/emoticon_angry.gif';
      }

      return '/gifts/emoticon_default.gif';
    };

    return (
      <motion.img
        variants={item}
        style={{ borderRadius: '50%' }}
        className={styles.valentin__content__emoticon}
        src={getSrc()}
        width={100}
        height={100}
        alt="Dudu flores"
      />
    );
  };

  const getConfetti = () => {
    if (typeof window !== 'undefined' && showConfetti) {
      return (
        <div
          className={`${styles.valentin__content__confetti} 
      ${showConfetti ? 'show_confetti' : 'dont_show_confetti'}`}
        >
          <Confetti
            width={548}
            height={window?.innerHeight}
          />
        </div>
      );
    }
    return null;
  };
  
  return (
    <main className={styles.valentin}>
      <motion.div className={styles.valentin__content} variants={variants}  initial="hidden"
        animate="show" key={step}>
        {getConfetti()}
        {getEmoticon()}
        {getTextByStep()}
        {getImageByStep()}
        {getButtons()}
        
      </motion.div>
    </main>
  );
};

export default Home;
