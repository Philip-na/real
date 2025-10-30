import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";



interface Props {
    onPress?: () => void,
    item: any,
}

export const FeaturedCard = (
    {onPress, item:{image, name, address, rating, price}}: Props
) => {

    return (
        <TouchableOpacity onPress={onPress} className={'flex flex-col items-start w-60 h-80 relative'}>

            <Image source={{uri: image }} className={'size-full rounded-2xl'} />

            <Image source={images.cardGradient} className={'size-full rounded-2xl absolute bottom-0'} />


            <View className={'flex flex-row  items-center  bg-white/90 absolute px-3 py-1.5 right-5 top-5 rounded-2xl'} >
                <Image source={icons.star} className={'size-3.5'} />
                <Text className={'text-xs  font-bold text-primary ml-1'} >
                    {rating}
                </Text>
            </View>

            <View className={'flex flex-col items-start absolute bottom-5  z-50 inset-x-5'}>
                <Text className={'text-xl font-extrabold text-white'}  numberOfLines={1}>{name}</Text>
                <Text className={'text-sm font-normal text-white'}>
                    {address}
                </Text>

                <View className={'flex flex-row w-full items-center justify-between'}>
                    <Text className={'text-xl font-bold text-white'}>
                        ${price}
                    </Text>
                    <Image source={icons.heart} className={'size-5'} />
                </View>

            </View>

        </TouchableOpacity>
    )
}


 export const HouseCard = (
     {onPress, item:{rating, image, name, price,type}}: Props
 )=> {


    return (
        <TouchableOpacity onPress={onPress} className={'flex-1 mb-3 items-start w-full px-3 py-4 bg-white shadow-lg shadow-black-100/70 relative'}>

            <Image source={{uri:image}} className={'w-full h-40 rounded-2xl'} />

            <View className={'flex flex-row  items-center  bg-white/90 absolute px-3 py-1.5 right-5 top-5 rounded-2xl'} >
                <Image source={icons.star} className={'size-3.5'} />
                <Text className={'text-xs  font-bold text-primary ml-1'} >
                    {rating}
                </Text>
            </View>

            <View className={'flex flex-col items-start  '}>
                <Text className={'text-lg font-extrabold text-black-300 '}  numberOfLines={1}>{name}</Text>
                <Text className={'text-sm font-normal text-black-300'}>
                    {type}
                </Text>

                <View className={'flex flex-row w-full items-center justify-between mt-2'}>
                    <Text className={'text-xl text-primary-300 font-bold '}>
                        ${price}
                    </Text>
                    <Image source={icons.heart} className={'h-5 w-5 '} tintColor={"#191d31"} />
                </View>

            </View>

        </TouchableOpacity>
    )
}