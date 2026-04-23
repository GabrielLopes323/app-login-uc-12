import { useState } from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login({ navigation }: any){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function handleLogin(){
  try{
    const logged = await signInWithEmailAndPassword(auth,email,password);
    console.log("LOGIN OK", logged.user.uid);
    navigation.navigate("Lista");
  }catch(e){
    console.log("LOGIN FAIL",e);
  }
}

return(

<View style={{flex:1, justifyContent:"center", padding:20, gap:12, backgroundColor:"#111"}}>

<Text style={{fontSize:22, color:"#fff", textAlign:"center", marginBottom:10}}>LOGIN</Text>

<TextInput
placeholder="Email"
placeholderTextColor="#aaa"
value={email}
onChangeText={setEmail}
autoCapitalize="none"
style={{borderWidth:1, borderColor:"#555", padding:12, borderRadius:8, color:"#fff"}}
/>

<TextInput
placeholder="Senha"
placeholderTextColor="#aaa"
secureTextEntry
value={password}
onChangeText={setPassword}
style={{borderWidth:1, borderColor:"#555", padding:12, borderRadius:8, color:"#fff"}}
/>

<Pressable onPress={handleLogin} style={{backgroundColor:"#4CAF50", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Entrar</Text>
</Pressable>

<Pressable onPress={()=> navigation.navigate("Cadastro")} style={{backgroundColor:"#333", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Criar conta</Text>
</Pressable>

</View>

)

}