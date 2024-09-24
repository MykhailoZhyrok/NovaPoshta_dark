import { StyleSheet, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import points from '../dataGeo.json';

interface Point {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

const pointsArray: Point[] = points;
const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.4647,   
          longitude: 35.0462,  
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pointsArray.map((el) => (
          <Marker
            key={el.id}
            coordinate={{ latitude: el.latitude, longitude: el.longitude }}
            title={el.title}
            description={el.description}
          />
        ))}
      </MapView>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
