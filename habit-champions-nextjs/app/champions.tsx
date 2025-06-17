import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const champions = [
  { id: 'warrior', name: 'Warrior', image: require('../assets/images/profiles/warriorPortrait.png') },
  { id: 'mind-mage', name: 'Mind Mage', image: require('../assets/images/profiles/coming_soon.jpg') },
  { id: 'tooth-sage', name: 'Tooth Sage', image: require('../assets/images/profiles/toothSagePortrait.png') },
  { id: 'scholar', name: 'Scholar', image: require('../assets/images/profiles/coming_soon.jpg') },
  { id: 'sentinel', name: 'Sentinel', image: require('../assets/images/profiles/coming_soon.jpg') },
  { id: 'forager', name: 'Forager', image: require('../assets/images/profiles/coming_soon.jpg') },
  { id: 'spirit-monk', name: 'Spirit Monk', image: require('../assets/images/profiles/coming_soon.jpg') },
  { id: 'merchant', name: 'Merchant', image: require('../assets/images/profiles/merchantPortrait.png') },
];

export default function ChampionGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Champions</Text>
      <FlatList
        data={champions}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/champion/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});
