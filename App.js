import { StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import newAPI from './src/api/ApiManager';
import LatestNews from './components/LatestNews';
import Card from './components/Card';
import Categories from './components/Categories';
import Header from './components/Header';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [repeater,setRepeater] = useState(0);
  const [title, setTitle] = useState()

  useEffect(()=> {
      getNews();
      setTimeout(() => setRepeater(prevState=>prevState+1), 1000000);
  }, [repeater])

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
      <ScrollView>
        <Text style={styles.sectionHeader}>Breaking News</Text>
        {isLoading ? <ActivityIndicator size="large" color="#DA3349" /> : (
          <LatestNews />
        )}
        <Categories getNews={getNews} />
        <Text style={styles.sectionHeader}>{title}</Text>
        {isLoading ? <ActivityIndicator visible={true} /> : (
          <FlatList
            data={news.posts}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
              <Card item={item}/>
            )}
          />
        )}
      </ScrollView>
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
