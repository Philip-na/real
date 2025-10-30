import {useGlobalContext} from "@/lib/global-provider";
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator} from "react-native";
import {Redirect, Slot} from "expo-router";

function AppLayOut(){
    const  {loading, isLogged} = useGlobalContext();

    if(loading) return (
            <SafeAreaView className={'bg-white flex justify-center items-center h-full'}>
                <ActivityIndicator className={"text-primary"} size="large" />
            </SafeAreaView>
        )




    if(!isLogged) return <Redirect href={'/sign-in'}/>

    return <Slot />
}

export  default  AppLayOut