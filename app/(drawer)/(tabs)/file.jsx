import React, { useState,useRef  } from "react";
import { View, Button, Alert, Text } from "react-native";
import { File, Directory, Paths } from "expo-file-system";

export default function App() {
  const [progress, setProgress] = useState(0);
  const Controllerref=useRef(null);

  const downloadVideo = async () => {
    try {
      setProgress(0);

      const url =
        "https://www.kcra.com/article/texas-circuit-breaker-roller-coaster-stuck-video/73982473";

      const destination = new Directory(
        Paths.cache,
        "videos"
      );



      destination.create({
        idempotent: true,
        intermediates: true,
      });
      const controller= new AbortController();

      Controllerref.current=controller;



      const file = await File.downloadFileAsync(
        url,
        destination,
        {
          idempotent: true,
          signal: controller.signal,

          onProgress: ([byWritten, totalBytes]) => {
            if (totalBytes > 0) {
              const percentage = byWritten / totalBytes;

              console.log(
                Math.round(percentage * 100) + "%"
              );

              setProgress(percentage);
            }
          },
        }
      );


      console.log("Video downloaded:", file.uri);

      setProgress(1);

      Alert.alert(
        "Success",
        "Video downloaded successfully"
      );

    } catch (error) {
      console.log("Download error:", error);

      Alert.alert(
        "Error",
        "Video download failed"
      );
    }
  };

  const cancelDownload=()=>{
    if(Controllerref.current){
      Controllerref.current.abort();
      Controllerref.current=null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Download Video"
        onPress={downloadVideo}
      />
      <Button
        title="cancel download"
        onPress={cancelDownload}
      />
      

      <View
        style={{
          width: 300,
          height: 25,
          backgroundColor: "#ddd",
          marginTop: 30,
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 18,
        }}
      >
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
}