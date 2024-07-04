import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as counterActionCreators from '../../store/slices/counterSlice';
import * as langActionCreators from '../../store/slices/langSlice';
import CONSTANTS from '../../constants';
import styles from './Counter.module.scss';
import cx from 'classnames';
import { bindActionCreators } from '@reduxjs/toolkit';
const {
  LANGUAGE: { EN_US, UA_UA, PL_PL, DE_DE },
  THEMES,
} = CONSTANTS;

const translations = new Map([
  [
    EN_US,
    {
      countText: 'Count',
      stepText: 'Step',
      incrementText: 'Increment',
      decrementText: 'Decrement',
    },
  ],
  [
    UA_UA,
    {
      countText: 'Значення лічильнику',
      stepText: 'Крок',
      incrementText: 'Збільшити значення',
      decrementText: 'Зменшити значення',
    },
  ],
  [
    PL_PL,
    {
      countText: 'znaczenie licznika',
      stepText: 'ustawić krok',
      incrementText: 'zwiększać',
      decrementText: 'zmniejszać',
    },
  ],
  [
    DE_DE,
    {
      countText: 'Der Wert des Zählers',
      stepText: 'Gegenschritt',
      incrementText: 'Erhöhen Sie den Zähler',
      decrementText: 'Verringern Sie den Zähler',
    },
  ],
]);

const Counter = (props) => {
  const language = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);
  const { count, step } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const { setStep, setLang, increment, decrement } = bindActionCreators(
    { ...counterActionCreators, ...langActionCreators },
    dispatch
  );

  const translation = translations.get(language);

  const { countText, stepText, incrementText, decrementText } = translation;

  const className = cx({
    [styles.darkTheme]: theme === THEMES.DARK,
    [styles.lightTheme]: theme === THEMES.LIGHT,
  });

  return (
    <div className={className}>
      <select
        value={language}
        onChange={({ target: { value } }) => setLang(value)}
      >
        <option value={EN_US}>English</option>
        <option value={UA_UA}>Ukrainian</option>
        <option value={DE_DE}>Deutch</option>
        <option value={PL_PL}>Polska</option>
      </select>

      <p>
        {countText}: {count}
      </p>
      <label>
        {stepText}
        <input
          type="number"
          value={step}
          onChange={({ target: { value } }) => setStep(value)}
        />
      </label>
      <button onClick={() => increment()}>
        {incrementText}
      </button>
      <button onClick={() => decrement()}>
        {decrementText}
      </button>
    </div>
  );
};

export default Counter;
