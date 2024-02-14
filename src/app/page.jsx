'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useTypewriter } from 'react-simple-typewriter';
import Confetti from 'react-confetti';
import styles from './page.module.scss';

import {
  duduYesQuestions,
  duduNoQuestions,
  initialImage,
  duduYesImages,
  duduNoImages,
  initialQuestion,
  defaultImage,
  yesButtonAfirmativeOptions,
  yesButtonNegativeOptions,
  noButtonAfirmativeOptions,
  noButtonNegativeOptions,
} from '@/utilities/data';
import { variants, item } from '@/utilities/framer-motion';
import useFinal from '@/hooks/useFinal';

const Home = () => {
  const [answer, setAnswer] = useState('no');
  const [step, setStep] = useState(0);
  const [hoverButton, setHoverButton] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'Dudu';
  const to = searchParams.get('to') || 'Bubu';
  const customMessage = searchParams.get('message') || 'En este día quiero decirte que te amo mucho mi amor';

  const [name] = useTypewriter({
    words: [`Hola ${to}, te acaba de llegar un mensaje de ${from}, ¿quieres abrirlo? 👀`],
    typeSpeed: 70,
    loop: 1
  });

  const { finalMessage, finalImage, background } = useFinal(step, customMessage);

  const handleConfetti= () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  const handleAudio = () => {
    const audio = new Audio('/audio/audio.mp3');
    audio.volume = 0.05;
    audio.loop = true; 
    audio.play();
  };

  const handleAnswer = (value) => {
    if (value === 'abrir') {
      handleAudio();
    }
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
      const getFinalColor = () => {
        if (background === 'url(/images/background.jpg)') {
          return { color: 'red' };
        }
        return { color: 'white' };
      };

      return (
        <div>
          <motion.p
            style={getFinalColor() }
            variants={item}
            className={styles.valentin__content__title}>
            {finalMessage}
          </motion.p>
        </div>
      );
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
      return(
        <motion.img
          className={styles.valentin__content__image}
          variants={item}
          src={finalImage}
          width={400}
          height={400}
          alt="Dudu flores"
        />
      );
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
          onClick={() => handleAnswer('abrir')}
          whileHover={{ scale: 1.2 }}
          variants={item}
        >
          Abrir
        </motion.button>
      );
    }

    const getYesButtonText = () => {
      if (answer === 'si') {
        return yesButtonAfirmativeOptions[step - 1];
      }
      return yesButtonNegativeOptions[step - 1];
    };

    const getNoButtonText = () => {
      if (answer === 'si') {
        return noButtonAfirmativeOptions[step - 1];
      }
      return noButtonNegativeOptions[step - 1];
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
    if (typeof window !== 'undefined' && step > 0) {
      return (
        <div
          className={`${styles.valentin__content__confetti} 
      ${showConfetti ? 'show_confetti' : 'dont_show_confetti'}`}
        >
          <Confetti
            width={550}
            height={window?.innerHeight}
          />
        </div>
      );
    }
    return null;
  };

  const getBackground = () => {
    if (step === duduYesQuestions.length + 2) {
      return {
        backgroundImage: background,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

      };
    }
    return {
      backgroundImage: 'url(/images/background_mobile.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

    };
  };
  
  return (
    <main className={styles.valentin} style={getBackground()}>
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
