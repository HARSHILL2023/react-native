import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';
import {CameraView} from 'expo-camera';


const fileSystem = () => {
  const [progress, setProgress] = useState(0);
  const taskRef = useRef(null);

  const handleDownloadFile = async() => {
    try {
        setProgress(0);
        const url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"

        const destination = new File(Paths.document, "download.pdf")

        const task = File.createDownloadTask(url, destination, {
            onProgress :({byteWritten, totalBytes}) => {
                if(totalBytes > 0){
                    const percentage = (byteWritten / totalBytes) * 100;
                    setProgress(percentage);
                }
            }
        })

        taskRef.current = task;

        const file = await task.downloadAsync()

        if(file){
            setProgress(100)
            console.log(file.uri)
        }else{
            console.log("Download stopped");
        }
    } catch (error) {
        console.log("Download Error:", error)
    }
  }

  const handlePauseDownload = async() => {
    const task = taskRef.current;

    if(!task || task.state !== "active") {
        return;
    }

    try {
        const file = await task.pauseAsync();
        console.log(file.uri)
    } catch (error) {
        console.log("Pause Error:" ,error)
    }
  }

  const handleResumeDownload = async() => {
    const task = taskRef.current;

    if(!task || task.state !== "paused"){
        return;
    }

    try {
        const file = await task.resumeAsync();
        if(file){
            setProgress(100)
            console.log(file.uri);
        }else{
            console.log("Download Paused");
        }
    } catch (error) {
        console.log("Resume Error:",error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File System</Text>

      <Pressable style={styles.button} onPress={handleDownloadFile}>
        <Text style={styles.buttonText}>Download</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handlePauseDownload}>
        <Text style={styles.buttonText}>Pause</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleResumeDownload}>
        <Text style={styles.buttonText}>Resume</Text>
      </Pressable>

     <CameraView 
  ref={cameraRef}
  style={{ flex: 1 }}
  mode="video"
  uri={url2}
/>

      <Text style={styles.progressText}>Progress: {Math.round(progress)}%</Text>
    </View>
  );
};

export default fileSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: 150,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  progressText: {
    marginTop: 16,
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
  },
});