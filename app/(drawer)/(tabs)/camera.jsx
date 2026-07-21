import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Camera as CameraIcon, FlipHorizontal2, ImagePlus, RefreshCcw } from 'lucide-react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions({ writeOnly: true });
  const [photo, setPhoto] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted || !mediaPermission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <CameraIcon size={36} color="#2563eb" />
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionText}>We need your permission to show the camera and save photos.</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={async () => {
              await requestPermission();
              await requestMediaPermission();
            }}
          >
            <Text style={styles.permissionButtonText}>Grant Permissions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current && !isProcessing) {
      try {
        setIsProcessing(true);
        const options = { quality: 1, base64: true, exif: false };
        const capturedPhoto = await cameraRef.current.takePictureAsync(options);
        if (capturedPhoto?.uri) {
          setPhoto(capturedPhoto.uri);
        }
      } catch (error) {
        console.error('Failed to take picture:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  }

  async function savePhoto() {
    if (photo) {
      try {
        setIsProcessing(true);
        await MediaLibrary.saveToLibraryAsync(photo);
        Alert.alert('Saved!', 'Photo has been saved to your gallery.');
        setPhoto(null);
      } catch (error) {
        console.error('Failed to save photo:', error);
        Alert.alert('Error', 'Failed to save photo.');
      } finally {
        setIsProcessing(false);
      }
    }
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <View style={styles.previewOverlay}>
          <TouchableOpacity style={styles.previewButton} onPress={savePhoto}>
            {isProcessing ? <ActivityIndicator color="white" /> : <ImagePlus size={20} color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewButton} onPress={() => setPhoto(null)}>
            <RefreshCcw size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      
      {/* Overlay action buttons using absolute positioning */}
      <View style={styles.cameraActionContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
          <FlipHorizontal2 size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <View style={styles.captureButtonInner} />
          )}
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  permissionCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 12,
  },
  permissionText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 8,
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    gap: 10,
  },
  previewButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
  },
  iconButton: {
    padding: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  captureButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  placeholder: {
    width: 50,
  },
});