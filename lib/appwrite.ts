import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite";
import * as linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: "com.philip.real",
    endPoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    galleriesId: process.env.EXPO_PUBLIC_APPWRITE_GALLARIES_COLLECTION_ID!,
    agentsId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID!,
    propertiesId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!,
    reviewsId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!
};

const client = new Client()
    .setEndpoint(config.endPoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

export const account = new Account(client);
export const avatar = new Avatars(client);
export const databases = new Databases(client);

/**
 * Log in using Google OAuth (Expo + Appwrite)
 */
export async function login() {
    try {
        const redirectUri = linking.createURL("/");

        // ✅ Must await this call
        const res =  account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );

        if (!res || !res.toString()) throw new Error("OAuth URL not received from Appwrite");

        const browserResult = await openAuthSessionAsync(
            res.toString(),
            redirectUri
        );

        if (browserResult.type !== "success") throw new Error("Login failed or cancelled");

        // ✅ Parse redirect URL params
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        if (!secret || !userId) throw new Error("Missing OAuth session data");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Failed to create Appwrite session");

        return true;
    } catch (e) {
        console.error("Login error:", e);
        return false;
    }
}

/**
 * Logout current session
 */
export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (e) {
        console.error("Logout error:", e);
        return false;
    }
}

/**
 * Get current logged-in user + avatar
 */
export async function getCurrentUser() {
    try {
        const result = await account.get();
        if (result.$id) {
            const userAvatar = await avatar.getInitials({
                name: result.name
            });

            return {
                ...result,
                avatar: userAvatar,
            };
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getLatestProperties() {

    try {

        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]

        )

        return result.documents;

    } catch (error){

        console.log(error);
        return [];
    }
}



export  async  function getProperties(
    params?: { query: string; filter: string; limit: number }
) {

    try {
        const buildQuery = [Query.orderAsc('$createdAt')];

        const filter = params?.filter;
        const query = params?.filter;
        const limit = params?.limit;


        if (filter && filter === "All") buildQuery.push(Query.equal('type', filter));
        if (query) {
            buildQuery.push(Query.or([
                Query.search('name',query),
                Query.search('address',query),
                Query.search('type',query),
            ]));
        }


        if(limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesId!,
            buildQuery,

        )

        return result.documents;

    }catch (e) {
        console.error(e);
        return [];
    }
}