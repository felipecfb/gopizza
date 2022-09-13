import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";

import * as S from "./styles";

export function Product() {
  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.Header>
        <ButtonBack />
        <S.Title>Cadastrar</S.Title>
        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>

      <Photo uri="" />
    </S.Container>
  );
}
