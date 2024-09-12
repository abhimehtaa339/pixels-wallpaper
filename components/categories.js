import { View , Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { data } from "../constants/data";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Animated, {FadeInRight} from "react-native-reanimated";



const Categories = ({activeCategory , handleCategory}) => {
  return (
    <FlatList
          horizontal
          contentContainerStyle={
              styles.FlatListContainer
          }
          showsHorizontalScrollIndicator = {false}
          data={data.categories}
          keyExtractor={item => item}
          renderItem={({item , index}) => (
            <CategoriesItem
              isActive = {activeCategory == item}
              handleCategory = {handleCategory}
              title={item}
              index={index}
            />
          )}
          
          />
  )
}

const CategoriesItem = ({title , index , isActive , handleCategory}) =>{
  let color = isActive? theme.Colors.white: theme.Colors.neutral(0.8);
  let backgroundColor = isActive? theme.Colors.neutral(0.9) : theme.Colors.white;
    return(
      <Animated.View entering={FadeInRight.delay(index*200).duration(1000)}>
        <Pressable 
          onPress={() => handleCategory(isActive? null : title)}
          style={[styles.category, {backgroundColor}]}>
          <Text style = {[styles.title ,  {color}]}>
            {title}
          </Text>
        </Pressable>
       
      </Animated.View>
    )
}

const styles = StyleSheet.create({

  FlatListContainer: {
    marginHorizontal : wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth : 1,
    borderColor: theme.Colors.greyBg,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous'
  },
  title:{
    fontSize : hp(1.8),
    fontWeight : theme.fontWeights.medium
  }
    
})

export default Categories
