import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import points from '../dataGeo.json';

interface Point {
    id: number;
    latitude: number;
    longitude: number;
    title: string;
    description: string;
}

const pointsArray: Point[] = points;

const PointsListScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {pointsArray.map((el, index) => (
                <View style={styles.pointsCont} key={index}>
                    <Text>
                        {el.title}
                    </Text>
                    <Text>
                        {el.description}
                    </Text>
                    <Text>Відчинено цілодобово</Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default PointsListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    pointsCont: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 8,
        marginTop: 2
    }
})