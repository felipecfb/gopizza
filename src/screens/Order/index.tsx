import React from "react";
import { Platform } from "react-native";

import { ButtonBack } from "@components/ButtonBack";

import * as S from "./styles";

export function Order() {
  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </S.Header>
    </S.Container>
  );
}
