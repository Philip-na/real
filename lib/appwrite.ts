import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite"
import * as linking from "expo-linking"
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    platform : "com.philip.real",
    endPoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
};

export const client = new Client();

client.setEndpoint(config.endPoint!).setProject(config.projectId!).setPlatform(config.platform!);

export const avatar = new Avatars(client)
export const account = new Account(client)

export async function login(){
    try {
        
        const redirectUri =  linking.createURL('/');
        const res = account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        )
        if(!res) throw new Error("Login failed!");
        const browserResult = await openAuthSessionAsync(
            res.toString(),
            redirectUri,
        )
        if(browserResult.type !== 'success') throw new Error("Login failed!");
        
        const url = new URL(browserResult.url)
        
        const  secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()
        
        if(!secret || !userId)   throw new Error("Login failed!");

        const session = await  account.createSession(userId, secret);

        if(!session) throw new Error("Failed to save session!");

        return true

        
    } catch(e){
        console.log(e);
        return false;
    }
}

export async function logout(){
    try {

        await account.deleteSession('current');

        return true;

    } catch(e){
        console.log(e);
        return false;
    }
}

export async function getCurrentUser() {
try {

    const res = await account.get();

    if(res.$id){
        const userAvatar =  avatar.getInitials(res.name)

        return {
            ...res,
            avatar: userAvatar.toString()
        }
    }

    return null;

} catch(e){
    console.log(e);
    return null;
}
}