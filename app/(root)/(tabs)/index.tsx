
import { FlatList, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderCard from "@/components/header-card";
import Search from "@/components/search";
import {HouseCard} from "@/components/home/cards";
import Filters from "@/components/filters";
import React, {useEffect} from "react";
import FeatureSection from "@/components/home/feature-section";
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getProperties} from "@/lib/appwrite";


export default function Index() {

    const params = useLocalSearchParams<{query:string, filter:string}>()

    const {data:properties, loading, refetch} = useAppwrite( {
        fn: getProperties,
        params: {
            query: params.query!,
            filter: params.filter!,
            limit: 6
        },
        skip: true
    })

    const  handleCardPress = (id:string) => router.push(`/properties/${id}`);

    useEffect(() => {
        refetch({
            query: params.query,
            filter: params.filter,
            limit: 6
        });
    }, [params.query, params.filter]);

    return (
 <>
     <SafeAreaView  className={'bg-white h-full'}>


         <FlatList
             data={properties}
             renderItem={({item})=><HouseCard item = {item} onPress={()=>handleCardPress(item.$id )}/>}
             keyExtractor={(item) => item.$id.toString()}
             numColumns={2}
             contentContainerClassName={ 'pb-32'}
             columnWrapperClassName={ 'flex gap-5 px-5 flex-1'}
             showsVerticalScrollIndicator={false}

             ListHeaderComponent={
                 <View className={'px-5'} >

                     <HeaderCard />


                     <Search />


                     <View className={'my-5'}>
            <FeatureSection />


                         <View className={'flex  mt-5 flex-row justify-between'}>
                             <Text className={'text-black-300 font-bold text-lg'}> Our Recommendation</Text>

                             <TouchableOpacity className={''} onPress={() => {}}>
                                 <Text className={'text-primary-300 font-bold '}>
                                     See All
                                 </Text>
                             </TouchableOpacity>
                         </View>

                         <Filters />



                     </View>
                 </View>
             }


         />




     </SafeAreaView>
 </>
  );
}
