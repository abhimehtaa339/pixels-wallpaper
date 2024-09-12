import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const ImageCard = ({ item, index , columns }) => {

  const isLastInRow = () => {
    return (index+1) % columns === 0;
  }

  console.log(isLastInRow())

  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return {height: getImageSize(height , width)};
  };


  return (
    <Pressable style = {[style.imageWrapper , !isLastInRow() && style.spacer]}>
      <Image
        style={[style.image , getImageHeight()]}
        source={{ uri: item?.webformatURL}}
        transition={100}
      />
      {/* <Image style = {style.image} source={{uri: item?.webformatURL}}/> */}
    </Pressable>
  );
};

const style = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor : theme.Colors.greyBg,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    overflow : 'hidden',
    marginBottom: wp(2),
  },
  spacer:{
    marginLeft : wp(1),
    marginRight: wp(1)
  }
});

export default ImageCard;
