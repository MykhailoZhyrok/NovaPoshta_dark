import { View, Text, SafeAreaView, TouchableOpacity, Linking, Platform, StyleSheet, Animated, Dimensions, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import NavbarScreen from '../../../utils/NavbarScreen/NavbarScreen'
import { useRoute } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import loginEventEmitter from '../../../path/eventEmmit';
import Icon from 'react-native-vector-icons/AntDesign'

type visibleType = "За замовчуванням" | "Спрощений" | "Розширений";

export default function SettingsScreen() {
    const [isOn, setIsOn] = useState(false);
    const [circlePosition] = useState(new Animated.Value(0));
    const [isVisible, setIsVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    const [visibleOrder, setVisibleOrder] = useState<visibleType>("За замовчуванням")
    const route = useRoute();
    const resetKeychain = async () => {

        try {
            await Keychain.resetGenericPassword();

            loginEventEmitter.emit('logoutSuccess');
            console.log('Keychain data cleared successfully.');
        } catch (error) {
            console.log('Error clearing Keychain data:', error);
        }

    }

    const handleToggle = () => {
        setIsOn((prevState) => !prevState);
        Animated.timing(circlePosition, {
            toValue: isOn ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const circleTranslateX = circlePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 26],
    });

    const toggleContainer = () => {
        setIsVisible(!isVisible);

        if (!isVisible) {

            Animated.timing(slideAnim, {
                toValue: Dimensions.get('window').height / 60,
                duration: 300,
                useNativeDriver: false,
            }).start();

            Animated.timing(fadeAnim, {
                toValue: 0.5,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {

            Animated.timing(slideAnim, {
                toValue: Dimensions.get('window').height,
                duration: 300,
                useNativeDriver: false,
            }).start();

            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleBackgroundPress = () => {
        if (isVisible) {
            toggleContainer();
        }
    };

    const handleChoiceViewOrder = (prop: visibleType) => {
        setVisibleOrder(prop);
        toggleContainer()

    };
    const openSystemSettings = () => {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:'); 
        } else if (Platform.OS === 'android') {
          Linking.openSettings(); 
        } else {
          Alert.alert('Unsupported platform');
        }
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <NavbarScreen {...route} />
            <TouchableOpacity style={styles.optCont} onPress={toggleContainer}>
                <Text style={styles.mainText}>Відображення накладної</Text>
                <Text style={{ color: 'red' }}>{visibleOrder}</Text>
            </TouchableOpacity>
            <View style={styles.optCont}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.mainText}>Випадання карти лояльності</Text>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Даний параметр відповідає за відображення картки лояльності при повороті екрану.',
                                [{ text: 'OK' }] 
                            );
                        }}
                    >   
                    <Icon style={{ fontSize: 20, color: 'red', marginLeft: 10 }} name="infocirlceo" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.switch, isOn ? styles.switchOn : styles.switchOff]} onPress={handleToggle}>
                    <Animated.View style={[styles.circle, { transform: [{ translateX: circleTranslateX }] }]} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ padding: 10, borderWidth: 1, marginVertical: 15, marginHorizontal: 18, borderRadius: 8, borderColor: 'red' }} onPress={openSystemSettings}>
                <Text style={{ color: 'red', textAlign: 'center' }}>Системні налаштування</Text>
            </TouchableOpacity>

            <View style={{ padding: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => resetKeychain()}>
                    <Text style={{ color: 'red' }}>Вийти з акаунту</Text>
                </TouchableOpacity>
            </View>


            {isVisible && (
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleBackgroundPress}>
                    <Animated.View style={[styles.overlayBackground, { opacity: fadeAnim }]} />
                </TouchableOpacity>
            )}

            <Animated.View style={[styles.slideContainer, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.buttonOrderCont}>
                    <TouchableOpacity
                        style={[styles.buttonOrder, { borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomWidth: 1, backgroundColor: '#d4d4d4' }]}
                        onPress={() => handleChoiceViewOrder('За замовчуванням')}
                    >
                        <Text style={styles.buttonText}>За замовченням</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonOrder, { borderBottomWidth: 1, backgroundColor: '#d4d4d4' }]}
                        onPress={() => handleChoiceViewOrder('Спрощений')}
                    >
                        <Text style={styles.buttonText}>Спрощений</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonOrder, { borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: '#d4d4d4' }]}
                        onPress={() => handleChoiceViewOrder('Розширений')}
                    >
                        <Text style={styles.buttonText}>Розширений</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.buttonOrder, { borderRadius: 15, margin: 8, borderWidth: 0 }]}
                    onPress={toggleContainer}
                >
                    <Text style={styles.buttonText}>Скасувати</Text>
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    optCont: {
        paddingHorizontal: 18,

        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switch: {
        width: 50,
        height: 25,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 2,
    },
    switchOn: {
        backgroundColor: 'red',
    },
    switchOff: {
        backgroundColor: 'gray',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3, 
    },
    slideContainer: {
        position: 'absolute',
        bottom: 35,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        elevation: 10,
        zIndex: 2
    },
    buttonOrder: {
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    buttonOrderCont: {
        margin: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, 
        zIndex: 1, 
    },
    overlayBackground: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 15,
        color: 'red'
    },
    mainText:{
        fontSize: 15,
        paddingVertical: 15
    }
})
