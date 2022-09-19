import React, { useState } from "react";
import { Platform } from "react-native";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";

import { PIZZA_TYPES } from "@utils/pizzaTypes";

import * as S from "./styles";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </S.Header>

      <S.Photo source={{ uri: "http://github.com/felipecfb.png" }} />

      <S.Sizes>
        {PIZZA_TYPES.map((item) => (
          <RadioButton
            key={item.id}
            title={item.name}
            onPress={() => setSize(item.id)}
            selected={size === item.id}
          />
        ))}
      </S.Sizes>
    </S.Container>
  );
}
