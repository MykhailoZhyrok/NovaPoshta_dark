import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import NavbarScreen from '../../utils/NavbarScreen/NavbarScreen';
import CustomRefreshControl from '../../utils/LoadingScreen/CustomLoading';
import FooterScreen from '../FooterScreen/FooterScreen';
import {RootState}  from '../../store/store'; 
import { fetchOrders } from '../../OrdersSlice/OrderSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';

interface Order {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const MyOrdersScreen: React.FC = () => {
  const dispatch = useAppDispatch();  
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);  
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1300);
  }, []);

  useEffect(() => {
    if(refreshing){
      dispatch(fetchOrders())
    }
  }, [refreshing])

  useEffect(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1300);
    console.log('Initial Refresh');
  }, []);

  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
      <NavbarScreen {...route} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y <= -100) { 
            onRefresh();
          }
        }}
        scrollEventThrottle={16}
      >
        {refreshing && <CustomRefreshControl refreshing={refreshing} />}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          {orders.length?orders.map((el: Order)=>(
            <TouchableOpacity  style={{
              backgroundColor: '#fff',
              width: '100%',
              borderRadius: 16,
              justifyContent: 'space-between',
              marginBottom: 10,
              padding: 10,
            }}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, marginBottom: 8, lineHeight: 21.78, color: '#171718' }}>ID: {el.id}</Text>
              <Text style={{ textAlign: 'justify', lineHeight: 19.36, color: '#414141' }}>Name: {el.title}</Text>
            </View>
          </TouchableOpacity>
          )):<Text>У вас ще немає доставок</Text>}
        </View>
        
      </ScrollView>
      
      
    </SafeAreaView>
    <View style={{backgroundColor: 'red', height:2, width: '100%', alignItems: 'center'}}>
        <FooterScreen />
      </View>
    </>
  );
};

export default MyOrdersScreen;
