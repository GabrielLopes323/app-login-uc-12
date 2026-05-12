import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Cadastro({ navigation }: any){

const [nome,setNome] = useState("");
const [telefone,setTelefone] = useState("");
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

<View style={{flex:1, justifyContent:"center", padding:20, gap:12, backgroundColor:"#fff"}}>

<Text style={{fontSize:22, color:"#1565C0", textAlign:"center", marginBottom:10, fontWeight:"bold"}}>
CADASTRO
</Text>

<TextInput
placeholder="Nome"
placeholderTextColor="#777"
value={nome}
onChangeText={setNome}
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
placeholder="Telefone"
placeholderTextColor="#777"
value={telefone}
onChangeText={setTelefone}
keyboardType="phone-pad"
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
onPress={handleRegister}
style={{
backgroundColor:"#1976D2",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Criar conta</Text>
</Pressable>

<Pressable
onPress={()=> navigation.navigate("Login")}
style={{
backgroundColor:"#42A5F5",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Voltar</Text>
</Pressable>

</View>

)
}