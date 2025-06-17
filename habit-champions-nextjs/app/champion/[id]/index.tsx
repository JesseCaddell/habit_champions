import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';

const championData = {
  warrior: {
    name: 'Warrior',
    stats: { str: 18, int: 5, wis: 4, agi: 12, dex: 8, lck: 5 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
    xp: 12, //temp values for demo
    xpMax: 100, //temp values for demo
  },
  'mind-mage': {
    name: 'Mind Mage',
    stats: { str: 4, int: 18, wis: 17, agi: 8, dex: 6, lck: 7 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
  'tooth-sage': {
    name: 'Tooth Sage',
    stats: { str: 6, int: 10, wis: 12, agi: 10, dex: 15, lck: 7 },
    sprite: require('../../../assets/images/sprites/toothSage.png'),
  },
  scholar: {
    name: 'Scholar',
    stats: { str: 5, int: 20, wis: 14, agi: 7, dex: 9, lck: 6 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
  sentinel: {
    name: 'Sentinel',
    stats: { str: 12, int: 8, wis: 10, agi: 9, dex: 17, lck: 6 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
  forager: {
    name: 'Forager',
    stats: { str: 10, int: 10, wis: 11, agi: 8, dex: 14, lck: 9 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
  'spirit-monk': {
    name: 'Spirit Monk',
    stats: { str: 6, int: 12, wis: 18, agi: 10, dex: 7, lck: 10 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
  merchant: {
    name: 'Merchant',
    stats: { str: 8, int: 11, wis: 9, agi: 10, dex: 10, lck: 20 },
    sprite: require('../../../assets/images/sprites/coming_soon.jpg'),
  },
};

export default function ChampionDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
//   console.log("Champion ID:", id); //testing for proper ids



  const champ = championData[id as keyof typeof championData];
  if (!champ) return <Text>Champion not found</Text>;
  const { name, stats, sprite, xp, xpMax } = champ;

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{champ.name}</Text>
      </View>

      {/* Sprite Display */}
      <View style={styles.spriteWrapper}>
        <View style={styles.spriteOval}>
          <Image
            source={champ.sprite}
            style={styles.spriteImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* XP Bar */}
      <View style={styles.xpSection}>
        <Text style={styles.xpLabel}>{`${xp} / ${xpMax} XP`}</Text>
        <View style={styles.xpBarOuter}>
          <View style={[styles.xpBarInner, { width: `${(xp / xpMax) * 100}%` }]} />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsWrapper}>
        {Object.entries(champ.stats).map(([stat, value]) => (
          <View key={stat} style={styles.statRow}>
            <Text style={styles.statLabel}>{stat.toUpperCase()}</Text>
            <Text>{value}</Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push(`/champion/${id}/tasks`)}>
          <Text style={styles.buttonText}>Habits</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spriteWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  spriteOval: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spriteImage: {
    width: 144,
    height: 144,
  },
  xpSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  xpLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  xpBarOuter: {
    height: 12,
    backgroundColor: 'black',
    borderRadius: 6,
    overflow: 'hidden',
  },
  xpBarInner: {
    height: 12,
    width: '50%',
    backgroundColor: '#FFD700',
  },
  statsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statRow: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

