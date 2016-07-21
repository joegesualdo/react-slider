import React from 'react';
import Slider from './index.jsx';
import style from './index.css';
import test from 'ava';
import { shallow } from 'enzyme';

test('root tag is an input', t => {
  const wrapper = shallow(<Slider />);
  t.is(wrapper.type(), 'div');
});

test('root class is applied', t => {
  const wrapper = shallow(<Slider />);
  t.true(wrapper.hasClass(style.root));
});
