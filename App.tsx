import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {ReactElement, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,} from 'react-native';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Fourth Item'
  },
  {
    id: '5',
    title: 'Fifth Item'
  },
  {
    id: '6',
    title: 'Sixth Item'
  },
  {
    id: '7',
    title: 'Seventh Item'
  },
  {
    id: '8',
    title: 'Eigth Item'
  },
  {
    id: '9',
    title: 'Ninth Item'
  },
  {
    id: '10',
    title: 'Tenth Item'
  }
];

type ItemProps = {
  backgroundColor: string;
  height: number;
  item: ItemData;
  onPress: () => void;
  textColor: string;
  width: number;
};

const Item = ({backgroundColor, height, item, onPress, textColor, width}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor, height, width}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flatListDimensions, setFlatListDimensions] = useState({width: 0, height: 0});
  const flatListRef = useRef<FlatList<ItemData>>(null);

  const renderItem = ({item, index}: { item: ItemData, index: number }): ReactElement => {
    const backgroundColor = index === currentIndex ? '#6e3b6e' : '#f9c2ff';
    const color = index === currentIndex ? 'white' : 'black';

    return (
      <Item
        backgroundColor={backgroundColor}
        height={flatListDimensions.height}
        item={item}
        onPress={() => setCurrentIndex(index)}
        textColor={color}
        width={flatListDimensions.width}
      />
    );
  };

  return (
    <>
      <StatusBar/>
      <SafeAreaView>
        <FlatList
          data={DATA}
          decelerationRate="fast"
          extraData={currentIndex}
          initialNumToRender={1}
          getItemLayout={(data, index) => (
            {length: flatListDimensions.width, offset: flatListDimensions.height * index, index}
          )}
          keyExtractor={item => item.id}
          onLayout={(event) => {
            const {width, height} = event.nativeEvent.layout;
            setFlatListDimensions({width, height});
          }}
          ref={flatListRef}
          renderItem={renderItem}
          snapToInterval={flatListDimensions.height}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 300,
  },
  title: {
    fontSize: 32,
    padding: 20,
  },
});