import { useEffect, useState } from "react";
import { Text, View, Pressable, ScrollView, Alert } from "react-native";
import { 
collection, 
onSnapshot, 
query, 
orderBy,
deleteDoc,
doc
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Refresh({ navigation }: any){

const [notes,setNotes] = useState<any[]>([])

useEffect(()=>{

const q = query(
collection(db,"notes"),
orderBy("createdAt","desc")
)

const unsubscribe = onSnapshot(q,(snapshot)=>{

const data = snapshot.docs.map(n=>({
id:n.id,
movie:n.data().movie,
text:n.data().text
}))

setNotes(data)

})

return unsubscribe

},[])

async function DeleteNote(id:string){

try{

await deleteDoc(doc(db,"notes",id))

Alert.alert("Sucesso","Nota apagada!")

}catch(e){

console.log("Erro ao apagar",e)

}

}

return(

<View style={{flex:1, padding:20, backgroundColor:"#fff"}}>

<Text style={{
fontSize:28,
color:"#fff",
fontWeight:"bold",
textAlign:"center",
marginBottom:20,
marginTop:20,
backgroundColor:"#1565C0",
padding:15,
borderRadius:10
}}>
Filmes Assistidos
</Text>

<ScrollView style={{flex:1}}>

{notes.map(n=>(
<View
key={n.id}
style={{
backgroundColor:"#F5F5F5",
padding:12,
borderRadius:8,
borderWidth:1,
borderColor:"#1565C0",
marginBottom:10
}}
>

<Text style={{
fontSize:18,
color:"#1565C0",
fontWeight:"bold",
marginBottom:6
}}>
Filme: {n.movie}
</Text>

<Text style={{
fontSize:16,
color:"#000",
marginBottom:10
}}>
Nota: {n.text}
</Text>

<Pressable
onPress={()=> DeleteNote(n.id)}
style={{
backgroundColor:"#E53935",
padding:10,
borderRadius:8,
alignItems:"center"
}}
>
<Text style={{color:"#fff", fontWeight:"bold"}}>
Apagar
</Text>
</Pressable>

</View>
))}

</ScrollView>

<Pressable
onPress={()=> navigation.navigate("Lista")}
style={{
backgroundColor:"#1976D2",
padding:12,
borderRadius:8,
alignItems:"center",
marginTop:15
}}
>
<Text style={{color:"#fff", fontWeight:"bold"}}>Voltar</Text>
</Pressable>

</View>

)
}