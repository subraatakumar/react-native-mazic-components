import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';

const OrderTrackingUi = ({ data=[], maxWidth=Dimensions.get('window').width, ...restProps }) => {

  const step = useRef(new Animated.Value(0)).current;
  const maxValue = data.length * 60 + 20;
  const maxDuration = data.length * 4000

  // If Margin is set in Style then decrease the maxWidth by 2 times of specified margin (left+right)
  //console.log(typeof restProps?.style?.margin)
  if(restProps?.style?.margin){
    maxWidth= Dimensions.get('window').width - (restProps.style.margin * 2)
  }else if(restProps?.style?.marginLeft){
    maxWidth= Dimensions.get('window').width - (restProps.style.marginLeft)
  }else if(restProps?.style?.marginRight){
    maxWidth= Dimensions.get('window').width - (restProps.style.marginRight)
  }

  //console.log(restProps.style.margin)
  Animated.timing(step, {
    toValue: maxValue,
    duration: maxDuration,
    useNativeDriver: false,
  }).start();


  return (
    <View style={{ height: maxValue, width:maxWidth, ...StyleSheet.flatten(restProps.style)}}>
      <View>
        <ScrollView
          style={{ height: maxValue }}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.uiContainer]}>
            {data.map((d, index) => (
              <InActiveView d={d} lastItem={data.length !== index + 1} key={index}/>
            ))}
          </View>
        </ScrollView>
        <Animated.ScrollView
          style={{ height: step, marginTop: -maxValue }}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.uiContainer]}>
            {data.map((d, index) => (
              <ActiveView d={d} lastItem={data.length !== index + 1} key={index}/>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}

export default OrderTrackingUi

const styles = StyleSheet.create({
  uiContainer: {},
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  line: {
    width: 2,
    height: 50,
  },
  bgGreen: {
    backgroundColor: 'green',
  },
  bgGrey: {
    backgroundColor: 'rgba(20,20,20,0.3)',
  },
});

export const InActiveView = ({ d, lastItem }) => {
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ alignItems: 'center', height: 60 }}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: d.inactiveColor || 'rgba(20,20,20,0.3)',
            },
          ]}></View>
        {lastItem && <View style={[styles.line, styles.bgGrey]}></View>}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ marginTop: -5 }}>{d.title}</Text>
        <Text>{d.subTitle}</Text>
      </View>
    </View>
  );
};

export const ActiveView = ({ d, lastItem }) => {
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ alignItems: 'center', height: 60 }}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: d.activeColor || 'green',
            },
          ]}></View>
        {lastItem && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: d.activeColor || 'green',
              },
            ]}></View>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ marginTop: -5 }}>{d.title}</Text>
      </View>
    </View>
  );
};
