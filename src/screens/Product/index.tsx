import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { InputPrice } from "@components/InputPrice";

import * as S from "./styles";

export function Product() {
  const [image, setImage] = useState("");

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
  
  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
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

      <InputPrice size="P" />
      <InputPrice size="M" />
      <InputPrice size="G" />
    </S.Container>
  );
}
