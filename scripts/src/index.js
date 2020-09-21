'use strict'

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import photoData from './modules/photoData';
import valid from './modules/valid';
import slider from './modules/slider';

//Таймер
countTimer('30 september 2020');

//Меню  
toggleMenu();

//Модальное окно
togglePopUp();

//Табы
tabs();

//Слайдер
slider();

//Изменение фото
photoData();

//Валидация
valid();

//Калькулятор
calc();

//send-ajax-form
sendForm();