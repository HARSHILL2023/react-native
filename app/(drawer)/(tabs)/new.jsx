import { StyleSheet, Text, View, button } from 'react-native'
import React from 'react'
import { File,Paths } from 'expo-file-system'


const neww = () => {

    const handledownload = async () => {
      try{
        const url= "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        const destination=new File(Paths.document,"sample.mp4")
        const task=File.createDownloadTask(url,destination,{
            onProgress:({bytesWritten,totalBytes})=>{
                if(totalBytes > 0){
                    const percentage=(bytesWritten/totalBytes)*100
                    setProgress(percentage);
                }
            }
        })}
    catch(err){
        console.log(err);
    }
    }

    const handleresume = () => {

    }
    const handlePause = () => {

    }


    return (
        <View>
            <button title='download' onClick={handledownload} />
            <button title='pause' onClick={handlePause} />
            <button title='resume' onClick={handleresume} />
        </View>
    )
}

export default neww;

const styles = StyleSheet.create({})