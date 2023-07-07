import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import moment from 'moment';

export default function Header() {
    const date = moment()
        .utcOffset('+08:00')
        .format('DD MMMM YYYY');

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image source={require('../assets/img/header-logo.png')} style={styles.logo} />
            </View>
            <Text style={{marginTop:50, color:'#fff', fontSize:10,}}>📅 {date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'baseline',
        backgroundColor: 'black',
        paddingHorizontal: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 10,
    },
    imageWrapper: {
        height: 40,
        width: 180,
        overflow : "hidden",
        marginTop: 40,
    },
    logo: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
  });
