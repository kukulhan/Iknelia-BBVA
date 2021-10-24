import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, SectionList, Button } from 'react-native';
import { HeaderTitle } from '../components/HeaderTitle';
import { historyStyles } from '../themes/historyTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import awsIkneliaAPI from '../api/ikneliaAPI';
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('es-MX');
Tts.setDefaultRate(0.6);


interface Objets {
    dateString: string;
    data: string[]
}

interface History {
    fecha:       string;
    movimientos: Movimiento[];
}

interface Movimiento {
    item: string;
}

const startSpeech = ((texto: string) => {
    Tts.stop();
    Tts.speak(texto);
    console.log("hablando")
})

interface Props extends StackScreenProps<any, any> { };

export const HistoryScreen = ({ navigation, route }: Props) => {

    startSpeech("");
    const [stateHistoryMov, setStateHistoryMov] = useState<Objets[]>([]);
    var dataMessage = route.params?.text;
    var dataMessageND = route.params?.textNoData;

 

    const goToHome = (() => {
        navigation.navigate('Assistant');
    }) 
    let notTransaction="";
    
    

    const executeHistoryMov = async () => {
        await awsIkneliaAPI().get<History[]>(`/Prod/gettransactions/12345678/date/${route.params?.text.split('|')[0]}`).then(responseHistory => {
            if (responseHistory.status === 200) {
                responseHistory.data.map(x => {
                    var getMov: string[] = [];
                    x.movimientos.map(y => {
                        getMov.push(y.item);
                    })
                    var obj:Objets = {
                        dateString: x.fecha,
                        data:getMov
                    }
                    setStateHistoryMov(prevState => [ ...prevState, obj])

                })    
                startSpeech(dataMessage.split('|')[1]);
            }
        }).catch(x=>{
            
            startSpeech(dataMessageND);
            
        })
    }


    const isMounted = useRef(true);

    useEffect(() => {
        if (!isMounted.current) return;
        executeHistoryMov();
        return () => {
            isMounted.current = false;
        }
    }, [])
 

    let countData=0;
    stateHistoryMov.map(x=>{
    
        countData++;
    })

 
 
    if(countData===0)
    { 
        notTransaction=dataMessageND;
        return (
            <View style={historyStyles.containerHistory}>
                <View style={historyStyles.containerHeader}>
                    <HeaderTitle title={notTransaction}></HeaderTitle>
                </View>
      
                <TouchableOpacity style={historyStyles.backButtom} onPress={goToHome}>
                    <Icon
                        color='white'
                        name='arrow-back-outline'
                        size={45}
                    />
                </TouchableOpacity>
            </View>
        )
    }
else{
        return (
            <View style={historyStyles.containerHistory}>
                <View style={historyStyles.containerHeader}>
                    <HeaderTitle title={"Lista de Movimientos"}></HeaderTitle>
                </View>
                <View>
                    <SectionList
                        sections={stateHistoryMov}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Text style={historyStyles.containerText}> {item}</Text>}
                        renderSectionHeader={({ section }) => (
                            <View>
                                <HeaderTitle title={section.dateString}></HeaderTitle>
                            </View>
                        )
                        }
                    />
                </View>
                <TouchableOpacity style={historyStyles.backButtom} onPress={goToHome}>
                    <Icon
                        color='white'
                        name='arrow-back-outline'
                        size={45}
                    />
                </TouchableOpacity>
            </View>
        )

    }
}

