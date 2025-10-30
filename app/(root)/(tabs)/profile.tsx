import React from 'react'
import {Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import { logout} from "@/lib/appwrite";

interface ISettingsItemProps {
    icon: ImageSourcePropType,
    title: string,
    textStyle?: any,
    showArrow?: boolean,
    onPress?: () => void,
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true} : ISettingsItemProps) => (
    <>
        <TouchableOpacity onPress={onPress} className={'flex flex-row items-center justify-between py-3'}>
            <View className={'flex flex-row items-center gap-3'}   >
                <Image source={icon} className={'size-6'} />
                <Text className={`text-lg font-medium text-black-300 ${textStyle}`}>{title}</Text>
            </View>

            {
                showArrow && <Image source={icons.rightArrow} className={'size-6'} />
            }
        </TouchableOpacity>
    </>
)
const Profile = () => {

    const {user, refetch} = useGlobalContext();


    const handleLogout = async () => {
        const result = await  logout()
        if (result) {
            Alert.alert('Succes.', "Your account has been logged out.")
            await refetch()
        } else {
            Alert.alert('Failed to log out.', "Un Error Occured.");
        }
    }
  return (
    <SafeAreaView className={'h-full bg-white'}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName={'h-full pb-32 px-7'}
        >

            <View className="w-full flex flex-row items-center justify-between mt-5">
                <Text className={'text-xl font-bold'}>Profile</Text>

                <Image source={icons.bell} className="size-5" />
            </View>

        <View className="w-full flex flex-col items-center justify-center mt-5">
            <View className={
                "flex flex-col items-center justify-center relative mt-5"
            }>
                <Image source={ images.avatar} className={'size-32 rounded-full relative '} />

                <TouchableOpacity className={'absolute bottom-3 right-2'} >
                    <Image source={icons.edit} className={'size-9  '} />
                </TouchableOpacity>


            </View>
            <Text className={'text-lg font-bold mt-2 text-center'}>
                {user?.name} | Eco-colony
            </Text>
        </View>

            <View className="w-full flex flex-col  mt-10">

                <SettingsItem icon={icons.calendar} title={"My Bookings"} />
                <SettingsItem icon={icons.wallet} title={"Payments"} />
            </View>
            <View className="w-full flex flex-col  mt-5 border-t pt-5 border-primary-200">

                {
                    settings.slice(2).map((item, i) => (
                        <SettingsItem key={i} {...item} />
                    ))
                }
            </View>

            <View className="w-full flex flex-col  mt-5">

                <SettingsItem icon={icons.logout} title={"Logout"} showArrow={false} textStyle={'text-danger'} onPress={handleLogout} />

            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default Profile