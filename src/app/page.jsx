'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import {
  finalMessage,
  duduYesQuestions,
  duduNoQuestions,
  initialImage,
  finalImage,
  duduYesImages,
  duduNoImages,
  initialQuestion,
  defaultImage
} from '../utilities/data';

const Home = () => {
  const [answer, setAnswer] = useState('no');
  const [step, setStep] = useState(0);
  const [hoverButton, setHoverButton] = useState('');
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'Dudu';
  const to = searchParams.get('to') || 'Bubu';

  const handleAnswer = (value) => {
    setHoverButton(value);
    setAnswer(value);
    setStep(step + 1);
  };

  const getTextByStep = () => {
    let question;
    if (step === 0) {
      question = `Hola ${to}, te acaba de llegar un mensaje de ${from}, ¿quieres abrirlo?`;
    } else if (step === 1){
      question = initialQuestion;
    } else if (step === duduYesQuestions.length + 2) {
      question = finalMessage;
    } else {
      question = answer === 'si' ? duduYesQuestions[step - 2] : duduNoQuestions[step - 2];
    }

    return (
      <motion.p initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
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
      <motion.img initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}
        className={styles.valentin__content__image}
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
          initial={{ y: -100, opacity: 0 }}
          className={styles.valentin__content__buttons_yes}
          onClick={() => handleAnswer('')}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [15, -15, 15], opacity: 1, transition: { duration: 1.5, repeat: Infinity, delay: 2.5 } }}
          exit={{ opacity: 0 }}
        >
          Abrir
        </motion.button>
      );
    }

    return (
      <div className={styles.valentin__content__buttons}>
        <motion.button
          whileHover={{ scale: 1.5 }}
          className={styles.valentin__content__buttons_yes}
          onClick={() => handleAnswer('si')}
          onHoverStart={() => setHoverButton('si')}
        >
          Si
        </motion.button>
        <motion.button
          whileHover={{ scale: 0.8 }}
          className={styles.valentin__content__buttons_no}
          onClick={() => handleAnswer('no')}
          onHoverStart={() => setHoverButton('no')}
        >
          No
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
        style={{ borderRadius: '50%' }}
        className={styles.valentin__content__emoticon}
        src={getSrc()}
        width={100}
        height={100}
        alt="Dudu flores"
      />
    );
  };
  
  return (
    <main className={styles.valentin}>
      <div className={styles.valentin__content}>
        {getEmoticon()}
        {getTextByStep()}
        {getImageByStep()}
        {getButtons()}
      </div>
    </main>
  );
};

export default Home;
