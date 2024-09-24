import React, { useState, useRef } from 'react';
import { View, Animated, TouchableOpacity, PanResponder, Text } from 'react-native';

const sortOpt = ["Дата додавання", "Дата відправлення", "Дата доставки", "Місто призначення", "Статус посилки"];

const FooterScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [statIndex, setStatIndex] = useState(2)
  const heightAnim = useRef(new Animated.Value(50)).current; 
  const maxFooterHeight = 300; 



  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => 
        gestureState.dy < -10 || gestureState.dy > 10, 
      onPanResponderMove: (evt, gestureState) => {

        if (gestureState.dy < 0 && !isExpanded) {
          Animated.timing(heightAnim, {
            toValue: Math.min(maxFooterHeight, 50-gestureState.dy),
            duration: 0,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {           
            Animated.timing(heightAnim, {
            toValue: Math.max(50, maxFooterHeight - gestureState.dy),
            duration: 0,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
            
                expandFooter(); 
            

        } else if (gestureState.dy > 50) {
          collapseFooter(); 
        } else {
          Animated.spring(heightAnim, {
            toValue: isExpanded ? maxFooterHeight : 50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const expandFooter = () => {
    setIsExpanded(true);
    Animated.timing(heightAnim, {
      toValue: maxFooterHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapseFooter = () => {
    setIsExpanded(false);
    Animated.timing(heightAnim, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        height: heightAnim,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
      }}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={() => (isExpanded ? collapseFooter() : expandFooter())}>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <Text>{isExpanded ? 'Сортування посилок:' : `${sortOpt[statIndex]}`}</Text>
        </View>
      </TouchableOpacity>

        {sortOpt.map((el, index)=>(
            <TouchableOpacity style={{ padding: 15, width: '100%', alignItems: 'center', borderTopWidth: 1}} 
            onPress={()=>{
                setStatIndex(index)
                collapseFooter();
            }}>
              <Text style={{color: statIndex===index?'red':'black'}}>{el}</Text>
            </TouchableOpacity>
        ))}


    </Animated.View>
  );
};

export default FooterScreen;
