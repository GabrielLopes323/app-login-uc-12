import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Cadastro({ navigation }: any){

const [nome,setNome] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

async function handleRegister(){

  if(!nome || !email || !password || !confirmPassword){
    Alert.alert("Erro","Preencha todos os campos");
    return;
  }

  if(password !== confirmPassword){
    Alert.alert("Erro","As senhas não coincidem");
    return;
  }

  try{

    const create = await createUserWithEmailAndPassword(auth,email,password);

    console.log("REGISTER OK", create.user.uid);

    Alert.alert("Sucesso","Conta criada com sucesso!");

    navigation.navigate("Login");

  }catch(e:any){

    console.log("REGISTER FAIL", e.code);

    if(e.code === "auth/email-already-in-use"){
      Alert.alert("Erro","Esse email já está cadastrado");
    }else if(e.code === "auth/invalid-email"){
      Alert.alert("Erro","Email inválido");
    }else if(e.code === "auth/weak-password"){
      Alert.alert("Erro","A senha precisa ter pelo menos 6 caracteres");
    }else{
      Alert.alert("Erro","Não foi possível criar a conta");
    }

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

<TextInput
placeholder="Confirmar senha"
placeholderTextColor="#777"
secureTextEntry
value={confirmPassword}
onChangeText={setConfirmPassword}
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