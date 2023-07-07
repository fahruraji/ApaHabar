import { View, Text, ImageBackground, StyleSheet, FlatList, Linking, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import moment from 'moment';

import newAPI from '../src/api/ApiManager';

export default function LatestNews() {
    const [isLoading, setLoading] = useState(true);
    const [latestNews, setLatestNews] = useState([]);
  
    useEffect(()=> {
        getLatestNews();
        const interval=setInterval(()=>{
            getLatestNews()
          },10000)
          return()=>clearInterval(interval)
    }, [])
  
    function getLatestNews() {
      newAPI.get(`antara/terbaru/`)
        .then(async function(response){
            setLatestNews(response.data.data)
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
            setLoading(false);
        })
    }
  
    if (!latestNews) {
      return null
    }
  
    return (
        <View>
            {isLoading ? <ActivityIndicator visible={true} /> : (
                <FlatList 
                    horizontal
                    data={latestNews.posts}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    Linking.openURL(`${item.link}`)
                                }}
                            >
                                <View style={styles.imageWrapper}>
                                    <ImageBackground source={item.thumbnail !== null ? { uri: item.thumbnail } : require('../assets/img/No_Image_Available.jpg') } style={styles.image}>
                                        <View style={styles.textWrapper}>
                                        <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                                            <Text style={styles.published}>ANTARA News</Text>
                                            <Text style={styles.published}>{moment(item.pubDate).format('D MMM YYYY hh:mm')}</Text>
                                        </View>
                                        <Text style={styles.title}>{ item.title }</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </Pressable>
                        );
                    }}
                    contentContainerStyle={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>        
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingVertical: 15,
        // height: 600,
    },
    imageWrapper: {
        height: 170,
        width: 320,
        borderRadius: 20,
        marginRight: 20,
        overflow : "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
    },
    published: {
        fontSize: 10,
        color: '#fff',
    },
    textWrapper: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        paddingHorizontal: 12,
        position: "absolute",
        bottom: 8,
        left: 2,
        width: 320,
    },
});