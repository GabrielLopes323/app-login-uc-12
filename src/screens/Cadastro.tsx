import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Cadastro({ navigation }: any){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function handleRegister(){
  try{
    const create = await createUserWithEmailAndPassword(auth,email,password);
    console.log("REGISTER OK", create.user.uid);

    Alert.alert("Sucesso","Conta criada com sucesso!");

    navigation.navigate("Login");

  }catch(e){
    console.log("REGISTER FAIL",e);
    Alert.alert("Erro","Não foi possível criar a conta");
  }
}

return(

<View style={{flex:1, justifyContent:"center", padding:20, gap:12, backgroundColor:"#111"}}>

<Text style={{fontSize:22, color:"#fff", textAlign:"center", marginBottom:10}}>CADASTRO</Text>

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

<Pressable onPress={handleRegister} style={{backgroundColor:"#4CAF50", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Criar conta</Text>
</Pressable>

<Pressable onPress={()=> navigation.navigate("Login")} style={{backgroundColor:"#333", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Voltar</Text>
</Pressable>

</View>

)
}