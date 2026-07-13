// import { View, Text, Image, TextInput } from "react-native";
// import { StyleSheet, ScrollView,} from "react-native";
// import {useState,useReducer } from 'react'

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     fontWeight: "bold",


//   },
//   text2: {
//     fontSize: 18,
//     color: "gray"
//   },
//   box: {
//     width: 150,
//     height: 150,
//     backgroundColor: "blue",
//     borderRadius: 15,
//     marginTop: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   input: {
//   width: "80%",
//   borderWidth: 1,
//   borderColor: "gray",
//   borderRadius: 10,
//   padding: 12,
//   fontSize: 16,
// }



// })
// function home() {
//   const[name,setname]=useState("")
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.text}>React Native</Text>
//       <Text style={styles.text2}>leaninign syllabus</Text>
//       <View style={styles.box}></View> */}

//       {/* <Image style={styles.image} source={{
//         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyI5Zai9mRud0FkCrsCmpUk7sJ9KmHk1ULH9smlBnIcA&s=10"
//       }}></Image> */}
//     <Text style={{fontSize:62,marginBottom:42}}>FORM</Text>
//       <TextInput placeholder="enter your name"  style={styles.input} keyboardType="numeric" secureTextEntry={true} maxLength={10}  onChangeText={setname}/>
//       <Text>{name}</Text>
//     </View>


//   )

// }

// export default home;



import React, { useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
});

type State = {
  name: string;
};

type Action = {
  type: "SET_NAME";
  payload: string;
};

const initialState: State = {
  name: "",
};

// Reducer Function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, marginBottom: 30 }}>FORM</Text>

      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        onChangeText={(text) =>
          dispatch({
            type: "SET_NAME",
            payload: text,
          })
        }
      />

      <Text style={{ marginTop: 20, fontSize: 20 }}>
        {state.name}
      </Text>
      
    </View>
  );
}

export default Home;