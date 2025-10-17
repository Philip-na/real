import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text  style={{
        
        fontStyle: "italic"
      }} className=" font-bold text-primary-300 ">Wellcome to real  estate</Text>
      <Link href={"/sign-in"}>Sign In</Link>
      <Link href={"/expore"}>expore</Link>
      <Link href={"/profile"}>profile</Link>
      <Link href={"/properties/1"}>properties</Link>
    </View>
  );
}
