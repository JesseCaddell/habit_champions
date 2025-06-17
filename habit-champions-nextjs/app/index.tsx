import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top: Title + Party */}
      <View style={styles.topContent}>
        <Text style={styles.title}>Your Party</Text>
        <View style={styles.partyRow}>
          <Image
            source={require('../assets/images/profiles/coming_soon.jpg')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/profiles/coming_soon.jpg')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/profiles/coming_soon.jpg')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Middle: Buttons */}
      <View style={styles.buttonGroup}>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/champions')}>
          <Text style={styles.buttonText}>Champions</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/playerTasks')}>
          <Text style={styles.buttonText}>Tasks</Text>
        </Pressable>

        <Pressable style={styles.disabledButton}>
          <Text style={styles.disabledButtonText}>Boss Fight (Coming Soon!)</Text>
        </Pressable>

        <Pressable style={styles.disabledButton}>
          <Text style={styles.disabledButtonText}>Story Mode (Coming Soon!)</Text>
        </Pressable>
      </View>

      {/* Bottom: Footer */}
      <Text style={styles.footer}>v0.1 Alpha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  topContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  partyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 48,
  },
  heroImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    opacity: 0.5,
  },
  disabledButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
  },
});
