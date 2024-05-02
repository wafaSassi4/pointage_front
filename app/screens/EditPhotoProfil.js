import React, { useState } from "react";
import { StyleSheet, View, Image, ImageBackground, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditProfilePhoto = ({ currentPhoto, onSave }) => {
  const [photo, setPhoto] = useState(currentPhoto);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission refusée", "Permission d'accès à la galerie refusée.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
      onSave(result.uri); // Supposons que onSave est une prop fonction pour sauvegarder la photo choisie
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={50}
        style={styles.background}
        source={require("../assets/welcomebackground.jpg")}
      >
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <Button title="Choisir une photo" onPress={handleChoosePhoto} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default EditProfilePhoto;
