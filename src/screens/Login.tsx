import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login({ navigation }: any){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function handleLogin(){
  try{
    const logged = await signInWithEmailAndPassword(auth,email,password);
    console.log("LOGIN OK", logged.user.uid);

    Alert.alert("Sucesso","Login realizado com sucesso!");

    navigation.navigate("Lista");

  }catch(e){
    console.log("LOGIN FAIL",e);
    Alert.alert("Erro","Email ou senha inválidos");
  }
}

return(

<View style={{flex:1, justifyContent:"center", padding:20, gap:12, backgroundColor:"#fff"}}>

<Text style={{
fontSize:32,
color:"#1565C0",
textAlign:"center",
marginBottom:10,
fontWeight:"bold"
}}>
CineHub
</Text>

<TextInput
placeholder="Email"
placeholderTextColor="#777"
value={email}
onChangeText={setEmail}
autoCapitalize="none"
style={{
borderWidth:1,
borderColor:"#1565C0",
padding:12,
borderRadius:8,
color:"#000",
backgroundColor:"#F5F5F5"
}}
/>

<TextInput
placeholder="Senha"
placeholderTextColor="#777"
secureTextEntry
value={password}
onChangeText={setPassword}
style={{
borderWidth:1,
borderColor:"#1565C0",
padding:12,
borderRadius:8,
color:"#000",
backgroundColor:"#F5F5F5"
}}
/>

<Pressable
onPress={handleLogin}
style={{
backgroundColor:"#1976D2",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Entrar</Text>
</Pressable>

<Pressable
onPress={()=> navigation.navigate("Cadastro")}
style={{
backgroundColor:"#42A5F5",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Criar conta</Text>
</Pressable>

</View>

)

}