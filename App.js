import { StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import newAPI from './src/api/ApiManager';
import LatestNews from './components/LatestNews';
import Card from './components/Card';
import Categories from './components/Categories';
import Header from './components/Header';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState()

  useEffect(()=> {
      getNews();
      const interval=setInterval(()=>{
        getNews()
      },600000)
      return()=>clearInterval(interval)
  }, [])

  function getNews(category='humaniora', title='Nasional') {
      newAPI.get(`antara/${category}/`)
          .then(async function(response){
              setNews(response.data.data);
              setTitle(title);
          })
          .catch(function(error){
              console.log(error);
          })
          .finally(function(){
              setLoading(false);
          }
      )
  }

  if (!news) {
      return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAwareScrollView nestedScrollEnabled>
        <Text style={styles.sectionHeader}>Berita Terkini</Text>
        {isLoading ? <ActivityIndicator size="large" color="#DA3349" /> : (
          <LatestNews />
        )}
        <Categories getNews={getNews} />
        <Text style={styles.sectionHeader}>{title}</Text>
        {isLoading ? <ActivityIndicator visible={true} size="large" color="#DA3349" /> : (
          <FlatList
            data={news.posts}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
              <Card item={item}/>
            )}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: '#fff',
    marginBottom: 20,
    height: '100%',
  },
  sectionHeader: {
    fontSize:24,
    fontWeight:'bold',
    marginLeft:18,
  },
});
