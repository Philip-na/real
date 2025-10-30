import React from 'react'
import {Text, View, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import {SafeAreaView} from  "react-native-safe-area-context"
import images from "@/constants/images";
import icons from "@/constants/icons";
import {login} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";
import {Redirect} from "expo-router";

const SignIn = () => {

    const {refetch, loading, isLogged} = useGlobalContext()
    
    if (!loading && isLogged) return <Redirect href={'/'} />
    const handleSignIn = async () => {
        const result = await login()

        if(result){

            await refetch()
        } else {
            Alert.alert("Error", "Login failed")
        }
    }

  return (
    <SafeAreaView className='bg-white h-full'>
    <ScrollView contentContainerClassName='h-full'>
        <Image source={images.onboarding} className='w-full h-4/6' resizeMode={'cover'} />
        <View className={'px-10 '}>

            <Text className = 'text-base text-center uppercase font-rubik text-black-200' >
                Welcome! to RealState
            </Text>

            <Text className={'text-3xl font-bold text-black-300 text-center mt-2'}> Let&#39;s get you closer to </Text>
            <Text className={'text-3xl font-bold text-primary-300 text-center mt-2'}> Your Ideal Home </Text>

            <Text className={'text-lg text-black-200  text-center mt-12'}> Login to Restate with Google </Text>


            <TouchableOpacity onPress={handleSignIn} className={'bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'}>

                <View className={'flex flex-row justify-center items-center'}>

                    <Image source={icons.google} className={'w-5 h-5'} resizeMode={'contain'} />

                    <Text className={'text-center   text-black-300'}>Continue With Google</Text>
                </View>
            </TouchableOpacity>



        </View>
    </ScrollView>





    </SafeAreaView>
  )
}

export default SignIn