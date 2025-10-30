import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import {useGlobalContext} from "@/lib/global-provider";
import icons from "@/constants/icons";

const HeaderCard = () => {

    const {user} = useGlobalContext()
    return (
        <View className={'bg-white py-5 w-full flex flex-row justify-between'}>
            <View className={'flex flex-row  '} >
                <Image source={images.avatar} className={'rounded-lg size-12'} />
                <View className={'flex flex-col  relative ml-2'}>

                    <Text className={'text-base   text-black-100 font-normal'} >Good Morning</Text>
                    <Text className={'text-lg  text-black-default font-bold'}>
                        {
                            user?.name
                        }
                    </Text>


                </View>


            </View>


            <View className={'flex flex-col '}>
                <TouchableOpacity className={''} >
                    <Image source={icons.bell} className={'rounded-lg size-6'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default HeaderCard
