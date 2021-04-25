import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';

import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { PlantProps, loadPlants, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatering, setNextWatering] = useState<string>();

    useEffect(() => {
        async function loadStoredData() {
            const storedPlants = await loadPlants();

            const nextTime = formatDistance(
                new Date(storedPlants[0].dateTimeNotification).getTime(), 
                new Date().getTime(),
                {locale: pt});

            setNextWatering(`Don't forget to water ${storedPlants[0].name} at ${nextTime}.`);

            setMyPlants(storedPlants);
            setLoading(false);
        }

        loadStoredData();
    }, []);

    const handleRemove = (plant: PlantProps) => {
        Alert.alert('Delete', `Do you want to delete ${plant.name}?`, [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: async () => {
                try {
                    await removePlant(plant.id);
                    
                    setMyPlants(oldData => oldData.filter(item => item.id !== plant.id));

                } catch (error) {
                    Alert.alert('It was not possible to remove! 😢')
                }
            }}
        ])
    };

    if(loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image style={styles.spotlightImage} source={waterdrop} />
                <Text style={styles.spotlightText}>{nextWatering}</Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>Next watering</Text>

                <FlatList
                    data={myPlants}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary 
                            data={item} 
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                 />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});