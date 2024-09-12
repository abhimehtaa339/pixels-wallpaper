import{View, Text, StyleSheet , Image, Pressable} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { wp , hp} from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { BounceInDown, FadeInDown, FadeInRight} from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'

const welocmescreen = () =>{
  const router = useRouter();
  return (
    <View style={style.container}>
     <StatusBar style='dark'/>
     <Image 
     source={require('../assets/images/welcome.png')}
     style={style.bgImage}
     resizeMode='cover'/>
     

     {/* lineargradient */}
     <Animated.View entering={BounceInDown.duration(600)} style={{flex:1}}>
        <LinearGradient
                colors={['rgba(255,255,255,0)' , 'rgba(255,255,255,0.5)' , 'white' , 'white']}
                style={style.gradient}
                start={{x: 0.5, y:0}}
                end={{x: 0.5, y:0.8}}
        />
        {/* content */}
        <View style = {style.contentContainer}>
          <Animated.Text entering={FadeInDown.delay(400).springify()}
          style = {style.title}>
            Pixels
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).springify()}
          style = {style.punchLine}>
            Every Pixel Tells A Story
          </Animated.Text>
          <Animated.View entering={FadeInRight.delay(500).springify()}>
          <Pressable style = {style.startButton}
          onPress={() => router.push('home')}>
            <Text style = {style.startText}>
              Start Explore
            </Text>
          </Pressable>
          </Animated.View>
        </View>
     </Animated.View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
  },
  bgImage: {
    width : wp(100),
    height : hp(100),
    position : "absolute"

  },
  gradient:{
    width : wp(100),
    height : hp(65),
    bottom : 0,
    position : "absolute"
  },
  contentContainer: {
    flex : 1,
    alignItems : "center",
    justifyContent : "flex-end",
    gap : 14
  },
  title: {
    fontSize: hp(7),
    fontWeight: theme.fontWeights.bold
  },
  punchLine: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium
  },
  startButton: {
    marginBottom : 50,
    backgroundColor: theme.Colors.neutral(0.9),
    padding : 15,
    paddingHorizontal : 90,
    borderRadius : theme.radius.xl,
    borderCurve : "continuous"
  },
  startText: {
    color : theme.Colors.white,
    fontSize : hp(3),
    fontWeight: theme.fontWeights.medium,
    letterSpacing : 1
  }
});
export default welocmescreen