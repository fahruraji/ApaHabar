import { useState } from "react";
import { StyleSheet, FlatList, Image, Text, Pressable, View } from "react-native";

export default function Categories({getNews}) {
    const [emoji] = useState([
        {'img':require('../assets/img/indonesia.png'), 'text':'Nasional', 'category': 'humaniora'},
        {'img':require('../assets/img/world-icon.png'), 'text':'Internasional', 'category': 'dunia'},
        {'img':require('../assets/img/techno-icon.png'), 'text':'Teknologi', 'category': 'tekno'},
        {'img':require('../assets/img/politik.png'), 'text':'Politik', 'category': 'politik'},
        {'img':require('../assets/img/hukum.png'), 'text':'Hukum', 'category': 'hukum'},
        {'img':require('../assets/img/bola.png'), 'text':'Sepak Bola', 'category': 'bola'},
        {'img':require('../assets/img/olah-raga.png'), 'text':'Olahraga', 'category': 'olahraga'},
        {'img':require('../assets/img/hiburan.png'), 'text':'Hiburan', 'category': 'hiburan'},
        {'img':require('../assets/img/otomotif.png'), 'text':'Otomotif', 'category': 'otomotif'},
        {'img':require('../assets/img/lifestyle.png'), 'text':'Lifestyle', 'category': 'lifestyle'},
    ]);

    return (
        <FlatList 
            horizontal
            data={emoji}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => {
                return (
                    <Pressable
                        onPress={() => {
                            getNews(category=item.category, title=item.text );
                        }}
                    >
                        <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 30}}>
                            <Image source={item.img} style={styles.image} />
                            <Text style={{fontSize:11,}}>{item.text}</Text>
                        </View>
                    </Pressable>
                );
            }}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        marginHorizontal: 30,
        marginVertical: 20,
        paddingRight: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
    },
});