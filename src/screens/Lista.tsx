import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase";

export default function Lista({ navigation }: any){

const [movieName,setMovieName] = useState("");
const [noteText,setNoteText] = useState("");

async function AddNote(){

try{

await addDoc(collection(db,"notes"),{
movie: movieName,
text: noteText,
createdAt: serverTimestamp(),
user: auth.currentUser?.email ?? null
})

setMovieName("")
setNoteText("")

Alert.alert("Sucesso","Nota salva!")

}catch(e){
console.log("Erro salvar nota",e)
}

}

async function Logout(){

try{

await signOut(auth)

navigation.navigate("Login")

}catch(e){

console.log("Erro logout",e)

}

}

return(

<View style={{flex:1, padding:20, backgroundColor:"#fff"}}>

<View style={{flex:1, justifyContent:"center", gap:12}}>

<Text style={{fontSize:22, color:"#1565C0", textAlign:"center", marginBottom:10, fontWeight:"bold"}}>
Registre um Filme
</Text>

<TextInput
value={movieName}
onChangeText={setMovieName}
style={{
borderWidth:1,
borderColor:"#1565C0",
padding:12,
borderRadius:8,
color:"#000",
backgroundColor:"#F5F5F5"
}}
placeholder="Nome do filme"
placeholderTextColor="#777"
/>

<TextInput
value={noteText}
onChangeText={setNoteText}
style={{
borderWidth:1,
borderColor:"#1565C0",
padding:12,
borderRadius:8,
color:"#000",
backgroundColor:"#F5F5F5"
}}
placeholder="Digite uma nota para o filme"
placeholderTextColor="#777"
/>

<Pressable
onPress={AddNote}
style={{
backgroundColor:"#1976D2",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Salvar Nota</Text>
</Pressable>

<Pressable
onPress={()=> navigation.navigate("Refresh")}
style={{
backgroundColor:"#42A5F5",
padding:12,
borderRadius:8,
alignItems:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Ver Notas</Text>
</Pressable>

</View>

<Pressable
onPress={Logout}
style={{
backgroundColor:"#E53935",
padding:10,
borderRadius:8,
alignItems:"center",
marginBottom:10,
width:"40%",
alignSelf:"center"
}}>
<Text style={{color:"#fff", fontWeight:"bold"}}>Deslogar</Text>
</Pressable>

</View>

)

}