import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams, usePathname} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {

    const path = usePathname();
    const parms = useLocalSearchParams<{query?:string}>();

    const  [search, setSearch] = useState(parms.query);

    const debouncedSearch = useDebouncedCallback((text: string) => router
        .setParams({query: text}), 500);

    const handleSearch = (query: string) => {}

    return (
        <View className={'  flex flex-row items-center justify-between w-full  rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'}>
            <View className={
                'flex flex-row items-center justify-start z-50'
            } >
                <Image source={icons.search} className={'size-5'} />
                <TextInput
                    className={'text-sm text-black-300  '}
                    placeholder={'Search for anything'}
                    onChangeText={debouncedSearch}
                    value={search}

                />
            </View>

            <TouchableOpacity>
                <Image source={icons.filter} className={'size-5'} />
            </TouchableOpacity>
        </View>
    )
}
export default Search
