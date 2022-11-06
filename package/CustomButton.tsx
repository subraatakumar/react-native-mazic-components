import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColors, width} from './config/env';

type customButtonProps = {
  title: string;
  type?: string;
  onPressFn: any;
  style?: any;
  m?: number;
  bc?: string;
  bgc?: string; // background color
  br?: number; // border radius
  w?: number; // width
  sc?: string; // shadow color
  disabled?: boolean;
};

const CustomButton = ({
  title,
  type,
  bc,
  onPressFn,
  style,
  bgc = 'rgba(6,146,239,1)',
  br = 30,
  w = 250,
  sc = 'rgba(6,146,239,1)',
  m = 0,
  disabled = false,
}: customButtonProps) => {
  console.log(disabled);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? () => {} : onPressFn}
      style={{
        backgroundColor: disabled ? 'rgba(20,20,20,0.3)' : bgc,
        padding: 10,
        borderRadius: br,
        alignItems: 'center',
        shadowColor: sc,
        elevation: 8,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1.0,
        width: w,
        margin: m,
        ...style,
      }}>
      <Text style={{color: appColors.white}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
