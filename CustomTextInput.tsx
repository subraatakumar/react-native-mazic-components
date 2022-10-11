import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from './AppCss';

type validations =
  | 'valid-email'
  | 'only-digits'
  | 'only-letters'
  | 'no-space'
  | 'max'
  | 'min'
  | 'nil';
type CustomTextInputProps = {
  value: string;
  setValue: Function;
  err?: boolean;
  setErr?: Function;
  placeholder?: string;
  validation?: validations[];
  style?: any;
  max?: number;
  min?: number;
};

const CustomTextInput = ({
  value,
  setValue,
  err = false,
  setErr = () => {},
  placeholder = '',
  validation = ['nil'],
  style = [],
  min = 3,
  max = 30,
}: CustomTextInputProps) => {
  const [compErr, setCompErr] = useState('');

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const onChangeText = t => {
    // console.log(validation);
    for (let i = 0; i < validation.length; i++) {
      if (validation[i] === 'valid-email' && reg.test(t) === false) {
        // console.log(validation[i], ' valid-email error');
        setCompErr('Invalid Email Address');
        !err && setErr(true);
        break;
      } else if (validation[i] === 'no-space' && t.trim().includes(' ')) {
        // console.log(validation[i], ' no-space error');
        setCompErr("Don't include space");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'only-digits' && isNaN(t)) {
        // console.log(validation[i], ' only-digit error');
        setCompErr("Don't include letters");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'only-letters' && /[0-9]/.test(t)) {
        // console.log(validation[i], ' only-letters error');
        setCompErr("Don't include numbers");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'max' && t.trim().length > max) {
        // console.log(validation[i], ' max error');
        setCompErr('Should not be greater then ' + max + ' characters.');
        !err && setErr(true);
        break;
      } else if (validation[i] === 'min' && t.trim().length < min) {
        // console.log(validation[i], ' min error');
        setCompErr('Should not be less then ' + min + ' characters.');
        !err && setErr(true);
        break;
      } else if (validation.length == i + 1) {
        // console.log(validation[i], ' no-error');
        setCompErr('');
        setErr(false);
      }
    }
    setValue(t);
  };
  return (
    <>
      <TextInput
        value={value}
        onChangeText={t => {
          onChangeText(t);
        }}
        placeholder={placeholder ? placeholder : ''}
        style={{...globalStyles.planeTextInput, ...style}}
      />
      <Text style={{color: 'red'}}>{compErr}</Text>
    </>
  );
};

export default CustomTextInput;
