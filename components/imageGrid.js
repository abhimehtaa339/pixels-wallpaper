import { View, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imagecard";
import { wp, getColumnCount } from "../helpers/common";

const ImageGrid = ({ images }) => {
  // const columns = getColumnCount();  // Get the number of columns dynamically
  // console.log("Number of columns:", columns);  // Log the actual value, not the function

  const columns = getColumnCount();
  // console.log('imagecard:' , images[0])

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images} // Ensure `images` is an array with valid items
        numColumns={columns}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} /> // Ensure `item` is passed here
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
