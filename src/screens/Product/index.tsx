import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import { ButtonBack } from "@components/ButtonBack";
import { InputPrice } from "@components/InputPrice";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Photo } from "@components/Photo";

import * as S from "./styles";

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    }

    if (!image) {
      return Alert.alert("Cadastro", "Seleciona a imagem da pizza");
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza."
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert("Cadastro", "Pizza cadastrada com sucesso."))
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza.")
      );

    setIsLoading(false);
  }

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Header>
          <ButtonBack />
          <S.Title>Cadastrar</S.Title>
          <TouchableOpacity>
            <S.DeleteLabel>Deletar</S.DeleteLabel>
          </TouchableOpacity>
        </S.Header>

        <S.Upload>
          <Photo uri={image} />
          <S.PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handlePickerImage}
          />
        </S.Upload>

        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <Input onChangeText={setName} value={name} />
          </S.InputGroup>

          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
            </S.InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Tamamhos e preços</S.Label>
            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </S.InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
}
