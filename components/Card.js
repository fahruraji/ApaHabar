import { View, Text, Image, StyleSheet, Linking,Pressable } from "react-native";

export default function Card({item}) {
    return (
        <Pressable
            onPress={() => {
                Linking.openURL(`${item.link}`)
            }}
        >
            <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image source={item.thumbnail !== null ? { uri: item.thumbnail } : require('../assets/img/No_Image_Available.jpg') } style={styles.image} />
                </View>
                <View>
                    <Text style={styles.title}>{ item.title } </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 20,
        width: '65%',
    },
    imageWrapper: {
        width: 100,
        height: 70,
        borderRadius: 5,
        marginTop: 7,
        marginRight: 20,
        overflow : "hidden",
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});