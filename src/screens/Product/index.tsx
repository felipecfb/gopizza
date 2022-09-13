import React, { useEffect, useState } from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

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

          <Button title="Cadastrar pizza" isLoading={isLoading} />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
}
