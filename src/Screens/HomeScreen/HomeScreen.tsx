import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import Logo from '../../../assets/svgComponents/Logo';
import BarCode from '../../../assets/svgComponents/BarCode';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon6 from 'react-native-vector-icons/Entypo';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import NavbarScreen from '../../utils/NavbarScreen/NavbarScreen';
import { useNavigation, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import CardScreen from '../cardScreen';

import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const colorGradient = [
  'rgba(0, 0, 0, 0)',   
  'rgba(1, 1, 1, 0)',   
  'rgba(0, 0, 0, 1)',     
  
]

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<ParamListBase>>();
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [blur, setBlur] = useState<number>(150);
  const [visible, setVisible] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const currentScrollPosition = contentOffset.y;
    setScrollPosition(currentScrollPosition);
      if (currentScrollPosition > 0) {
      setBlur(0)
    } else {
      setBlur(150)
    }
  };

  const handleScrollEnd = () => {
    if (scrollPosition < 200) {
      
      scrollViewRef.current?.scrollTo({ y: 0, animated: true }); // Use the ref here
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

    } else {
      scrollViewRef.current?.scrollToEnd({ animated: true }); // Use the ref here
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };


  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavbarScreen {...route} />
      <CardScreen visible={visible} setVisible={setVisible}/>
      <View style={styles.banner}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={()=>setVisible(true)}>
          <BarCode width={60} height={60} />
          <BarCode width={60} height={60} />
          <BarCode width={60} height={60} />
          <BarCode width={60} height={60} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }}>Скануйте у відділенні</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
      >
        <View style={[styles.keyboardBar]}>

          <View style={[styles.rowBar]}>

            <TouchableOpacity style={[styles.rowButton, { paddingBottom: 1, paddingRight: 1 }]} onPress={() => navigation.navigate('MyOrders')}>
              <LinearGradient
                colors={[...colorGradient]}
                style={styles.gradientBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.buttonContent}>
                <Icon2 style={styles.icon} name='box-open' />
                <Text>Мої посилки</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowButton, { paddingBottom: 1, paddingLeft: 1 }]}>
              <LinearGradient
                colors={[...colorGradient]}
                style={styles.gradientBorder}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              <View style={styles.buttonContent}>
                <Icon2 style={styles.icon} name='globe' />
                <Text>Створити</Text>
                <Text>міжнародну посилку</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={[styles.rowBar, { paddingBottom: 0, }]}>

            <TouchableOpacity style={[styles.rowButton, { paddingTop: 1, paddingRight: 1 }]} onPress={() => navigation.navigate('Points')}>
              <LinearGradient
                colors={[...colorGradient]}
                style={styles.gradientBorder}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              />
              <View style={styles.buttonContent}>
                <Icon5 style={styles.icon} name='map-marked-alt' />
                <Text>Відділення</Text>
                <Text>та поштомати</Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.rowButton, { paddingTop: 1, paddingLeft: 1 }]} onPress={() => navigation.navigate('CreateOrder')}>
              <LinearGradient
                colors={[...colorGradient]}
                style={styles.gradientBorder}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
              <View style={styles.buttonContent}>
                <Icon6 style={styles.icon} name='box' />
                <Text>Створити</Text>
                <Text>посилку</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

        <View style={[styles.footer]}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Icon4 style={styles.footerIcon} name="chevron-down" size={24} />
          </Animated.View>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Розрахувати доставку</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Послуга Експрес драйв</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Виклик кур'єра</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Про компанію</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Новини</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Центр підтримки</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerText}>Документація</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={blur}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 16
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBar: {
    justifyContent: 'center',
    flexDirection: 'row',

  },
  rowButton: {
    width: '50%',
  },
  icon: {
    fontSize: 34,
    padding: 15
  },
  keyboardBar: {
    marginTop: '10%'
  },
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 24
  },
  footerButton: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 16
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },

  gradientBorder: {
    ...StyleSheet.absoluteFillObject,

  },
  buttonContent: {
    alignItems: 'center',
     backgroundColor: '#f0f0f0',
    flex: 1,
    paddingVertical: 36
  },
})
