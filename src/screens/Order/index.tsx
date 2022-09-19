import React from "react";
import { Platform } from "react-native";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";

import * as S from "./styles";

export function Order() {
  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </S.Header>

      <S.Photo source={{ uri: "http://github.com/felipecfb.png" }} />

      <S.Sizes>
        <RadioButton title="Pequeno" selected={false} />
        <RadioButton title="Médio" selected={true} />
        <RadioButton title="Grande" selected={false} />
      </S.Sizes>
    </S.Container>
  );
}
