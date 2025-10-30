import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, {useEffect} from 'react'

import {FeaturedCard} from "@/components/home/cards";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties} from "@/lib/appwrite";
import {router} from "expo-router";

const FeatureSection = () => {

    const {data: featured , loading} = useAppwrite( {
        fn: getLatestProperties
    })

    const  handleCardPress = (id:string) => router.push(`/properties/${id}`);

    return (
        <>



            <View className={'flex flex-row justify-between'}>
                <Text className={'text-black-300 font-bold text-lg'}>Featured</Text>

                <TouchableOpacity className={''} onPress={() => {}}>
                    <Text className={'text-primary-300 font-bold '}>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>




            {/*list*/}
            <FlatList
                data={featured}
                renderItem={({item})=><FeaturedCard item={item} onPress={()=>handleCardPress(item.$id)}/>}
                keyExtractor={(item) => item.$id.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName={ 'flex gap-5 mt-5'}

            />







        </>
    )
}
export default FeatureSection
