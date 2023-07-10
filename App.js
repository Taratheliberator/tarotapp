import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import tarotCards from './components/tarotCards';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.heading}>Главное Меню</Text>*/}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Выбор карты')}>
        <Text style={styles.buttonText}>Перейти к Выбору Карты</Text>
      </TouchableOpacity>
    </View>
  );
}

function CardSelectionScreen({navigation}) {
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const randomCard = tarotCards[randomIndex];

    const isReversed = Math.random() < 0.5;
    const selectedCard = {...randomCard, isReversed};
    navigation.navigate('Описание карты', {cards: [selectedCard]});
  };

  const getRandomCards = () => {
    const selectedCards = [];
    while (selectedCards.length < 3) {
      const randomIndex = Math.floor(Math.random() * tarotCards.length);
      if (!selectedCards.some(card => card.index === randomIndex)) {
        const randomCard = tarotCards[randomIndex];
        const isReversed = Math.random() < 0.5; // Случайный выбор прямой или перевернутой карты
        const selectedCard = {...randomCard, isReversed, index: randomIndex};
        selectedCards.push(selectedCard);
      }
    }
    navigation.navigate('Описание карты', {cards: selectedCards});
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Выбор Карты</Text> */}
      <TouchableOpacity style={styles.button} onPress={getRandomCard}>
        <Text style={styles.buttonText}>Выбрать Одну Карту</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getRandomCards}>
        <Text style={styles.buttonText}>Выбрать Три Карты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Главное меню')}>
        <Text style={styles.buttonText}>Вернуться в Главное Меню</Text>
      </TouchableOpacity>
    </View>
  );
}

function CardDetailScreen({route}) {
  const {cards} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {cards.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text style={styles.heading}>{card.name}</Text>
            <Image
              source={card.image}
              style={[
                styles.cardImage,
                card.isReversed && styles.reversedCardImage,
              ]}
            />
            <View style={[styles.cardDescription, {width: 300}]}>
              <Text>
                {card.isReversed
                  ? card.reversedDescription
                  : card.uprightDescription}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Главное меню" component={HomeScreen} />
        <Stack.Screen name="Выбор карты" component={CardSelectionScreen} />
        <Stack.Screen name="Описание карты" component={CardDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cardImage: {
    width: 300,
    height: 500,
    marginBottom: 16,
  },
  cardDescription: {
    marginTop: 8,
    alignItems: 'center',
  },
  reversedCardImage: {
    transform: [{rotate: '180deg'}],
  },
});

export default App;
