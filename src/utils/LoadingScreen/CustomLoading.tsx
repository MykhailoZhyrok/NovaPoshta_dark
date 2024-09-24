import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Dimensions, Text } from 'react-native';

import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const CustomRefreshControl: React.FC<{ refreshing: boolean }> = ({ refreshing }) => {
    const forkliftTranslateX = useRef(new Animated.Value(-width / 2)).current;
    const giftTranslateX = useRef(new Animated.Value(0)).current;
    console.log(width)
    useEffect(() => {
        if (refreshing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(forkliftTranslateX, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.bezier(0.5, 0.01, 0.5, 1),
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(giftTranslateX, {
                            toValue: width + 50,
                            duration: 900,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                        Animated.timing(forkliftTranslateX, {
                            toValue: width + 50,
                            duration: 900,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),

                    ]),

                ]),
            ).start();
        } else {
            forkliftTranslateX.setValue(-width / 2);
            giftTranslateX.setValue(0);
        }
    }, [refreshing]);

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, width: width }}>
                <Animated.View style={{ transform: [{ translateX: forkliftTranslateX }] }}>
                    <Icon2 style={{ fontSize: 66 }} name='forklift' />

                </Animated.View>
                <Animated.View style={{ transform: [{ translateX: giftTranslateX }], }}>
                    <Icon1 style={{ fontSize: 36 }} name='gift' />
                </Animated.View>
                <View style={{ width: 66, height: 66 }}></View>
            </View>

            <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>Завантаження...</Text>

        </>
    );
};

export default CustomRefreshControl;
