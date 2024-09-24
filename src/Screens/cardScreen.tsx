import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import BarCode from '../../assets/svgComponents/BarCode';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Keychain from 'react-native-keychain';

interface CardScreenProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
  }
  

export default function CardScreen({ visible, setVisible }: CardScreenProps) {

    const insets = useSafeAreaInsets();
    const [phone, setPhone] = useState('');
    const [name, setName]=useState('')
    const screenHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const [time, setTime] = useState(new Date());

    const slideAnim = useRef(new Animated.Value(screenHeight)).current;
    useEffect(() => {
        const timerId = setInterval(() => {
          setTime(new Date());
        }, 1000);
        
    
        return () => clearInterval(timerId);
      }, []);
    
      const formattedTime = time.toLocaleTimeString();
      useEffect(() => {
        
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0, 
                duration: 500, 
                useNativeDriver: true,
            }).start();
           
            
        }
        else if(!visible){
            Animated.timing(slideAnim, {
                toValue: Dimensions.get('window').height, // Опустити компонент за межі екрану
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
        retriveUser()
    }, [visible]);

    function formatPhoneNumber(phone: string) {
        const cleaned = phone.replace(/\D/g, '');
        console.log("Очищений номер:", cleaned);
    
        if (cleaned.length === 12 && cleaned.startsWith('380')) {
            const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
            console.log("Match:", match);
    
            if (match) {
                return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
            }
        }
    
        return phone;
    }
    
    
    
    
    const retriveUser = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
              const data = JSON.parse(credentials.password);
              const phoneNum = formatPhoneNumber(credentials.username);
              setPhone(phoneNum);
              const jwt = data.jwt;
              const userName = data.name;
              setName(userName);
            } else {
              console.log("No credentials found");
            }
          } catch (err) {
            console.log(err);
          }
      }
    return (
     
        <Animated.View style={[styles.container, 
            {
            paddingTop: insets.top, 
            paddingBottom: insets.bottom, 
            paddingLeft: insets.left, 
            paddingRight: insets.right,
            height: Dimensions.get('window').height, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.card}>
                <View style={styles.infoContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.timeText}>{formattedTime}</Text>
                    </View>
                    <View style={styles.barCodeCont}>
                        <View style={{width: 40, height: 40,  justifyContent: 'flex-end', alignItems: 'center'}}>
                            <View style={[styles.barcode, {width:screenHeight-120}]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <BarCode width={160} height={160} />
                                <BarCode width={160} height={160} />
                                <BarCode width={160} height={160} />
                                </View>
                                <TouchableOpacity style={styles.container1} onPress={()=>{setVisible(false)
                                    console.log('back', visible)
                                    
                                }}>
                                    <View style={[styles.line, styles.line1]} />
                                    <View style={[styles.line, styles.line2]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userData}>
                        <View style={styles.numberCont}>
                            <Text style={styles.leftText}>Карта Клієнта</Text>
                            <Text style={styles.nameText}>{name}</Text>
                            <Text style={styles.phoneText}>{phone}</Text>
                        </View>
                    </View>
                </View>


            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        zIndex: 1
    },
    card: {
        width: '90%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 100,
        borderRadius: 18,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column',
    },
    infoContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    cardHeader: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'blue',
        transform: [{ rotate: '-90deg' }],
    },
    leftText: {
        fontSize: 18,
        color: 'red',

    },
    timeText: {
        fontSize: 18,
        color: 'black',
        position: 'absolute'
    },
    userData: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',

        transform: [{ rotate: '-90deg' }],
    },
    nameCont: {
        marginLeft: 50,
        // transform: [{ rotate: '-90deg' }],
    },
    numberCont: {
        position: 'absolute',
        // transform: [{ rotate: '-90deg' }],
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 30
    },
    title: {
        alignSelf: 'flex-start',
        transform: [{ rotate: '-90deg' }],
    },
    phoneText: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
    },
    barcode: {
        position: 'absolute',
        // width: 400,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        // alignItems: 'flex-start',
        transform: [{ rotate: '90deg' }],
        
        justifyContent: 'space-between'

    },
    barCodeCont: {
        // backgroundColor: 'red',
        paddingTop:50,
        paddingRight: 40,
        alignItems: 'flex-end'

    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        
    },
    line: {
        position: 'absolute',
        width: 30,
        height: 5, 
        backgroundColor: 'red',
    },
    line1: {
        transform: [{ rotate: '45deg' }],
    },
    line2: {
        transform: [{ rotate: '-45deg' }],
    },
});
