import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import Categories from "../../components/categories";
import { apiCall } from "../../api";
import ImageGrid from "../../components/imageGrid";
import { debounce } from "lodash";

var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  // searchState
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchInput = (text) => {
    setSearch(text);
    handleTextDebounce(text);
  };
  

  const handleSearch = (text) => {
    console.log(text)
    setSearch(text)
    if(text.length > 2){
      //searchForImages
      page = 1
      setImages([]);
      fetchImages({page , q: text});
    }

    if(text==""){
      //reset search
      page = 1
      setImages([]);
      fetchImages({page});
    }

  }

  const handleTextDebounce = useCallback(debounce(handleSearch , 400), []);

  // category
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategory = (cat) => {
    setActiveCategory(cat);
  };

  //image State
  const [images , setImages] = useState([]);

  //hook
  useEffect (() =>{
      fetchImages();
  } , []);

  const fetchImages = async (param = {page: 1} , append = false) =>{
    let res = await apiCall(param);
    if(res.success && res?.data?.hits){
      if(append){
        setImages([...images , ...res.data.hits])
      }else{
        setImages([...res.data.hits])
      }
      
        
    }
  }

  return (
    <View style={[style.container, { paddingTop }]}>
      <View style={style.header}>
        <Pressable>
          <Text style={style.title}>Pixels</Text>
        </Pressable> 

        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.Colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* searchbar */}
        <View style={style.searchBar}>
          <View style={style.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.Colors.neutral(0.4)}
            />
          </View>

          <TextInput
            placeholder="Search for photos..."
            style={style.searchInput}
            value={search}
            ref={searchInputRef}
            onChangeText={handleSearchInput}
          />
          {search && (
            <Pressable style={style.closeIcon} onPress={() => searchInputRef}>
              <Ionicons
                name="close"
                size={24}
                color={theme.Colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* Categories */}

        <View style={style.categories}>
          <Categories
            activeCategory={activeCategory}
            handleCategory={handleCategory}
          />
        </View>

        {/* image masonry gird */}
        <View>
          {
            images.length>0 && <ImageGrid images = {images}/>
          }
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.Colors.neutral.apply(0.9),
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(2),
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: theme.Colors.white,
    borderColor: theme.Colors.greyBg,
    padding: 6,
    paddingStart: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.Colors.neutral(0.4),
    borderRadius: theme.radius.sm,
    padding: 8,
  },
});

export default HomeScreen;
