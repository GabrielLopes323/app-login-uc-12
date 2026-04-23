import { useState } from "react";
import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export default function Lista({ navigation }: any){

const [noteText,setNoteText] = useState("");

async function AddNote(){

try{

await addDoc(collection(db,"notes"),{
text: noteText,
createdAt: serverTimestamp(),
user: auth.currentUser?.email ?? null
})

setNoteText("")

Alert.alert("Sucesso","Nota salva!")

}catch(e){
console.log("Erro salvar nota",e)
}

}

return(

<View style={{flex:1, justifyContent:"center", padding:20, gap:12, backgroundColor:"#111"}}>

<Text style={{fontSize:22, color:"#fff", textAlign:"center", marginBottom:10}}>Nova Nota</Text>

<TextInput
value={noteText}
onChangeText={setNoteText}
style={{borderWidth:1, borderColor:"#555", padding:12, borderRadius:8, color:"#fff"}}
placeholder="Digite uma nota"
placeholderTextColor="#aaa"
/>

<Pressable onPress={AddNote} style={{backgroundColor:"#4CAF50", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Salvar Nota</Text>
</Pressable>

<Pressable onPress={()=> navigation.navigate("Refresh")} style={{backgroundColor:"#333", padding:12, borderRadius:8, alignItems:"center"}}>
<Text style={{color:"#fff"}}>Ver Notas</Text>
</Pressable>

</View>

)

}