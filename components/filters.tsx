import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filters = () => {

    const  parms = useLocalSearchParams<{filter:string}>();
    const [selectedCategory, setSelectedCategory] = useState(parms.filter || 'All')

    const handelCategoryPress = (category:string)=>{}
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className={'mt-3 mb-2'}>

            {
                categories.map((item, index)=>(

                    <TouchableOpacity onPress={()=> handelCategoryPress(item.category)} key={item.category + index} className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? "bg-primary-300 "  : "bg-primary-100 border-primary-200" }`} >
                        <Text className={`text-sm ${selectedCategory === item.category ? 'text-white' : 'text-black-300'}`}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))
            }

        </ScrollView>
    )
}
export default Filters
