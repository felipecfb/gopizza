import React, { useState } from "react";
import { Platform } from "react-native";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { PIZZA_TYPES } from "@utils/pizzaTypes";

import * as S from "./styles";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.ContentScroll>
        <S.Header>
          <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
        </S.Header>

        <S.Photo source={{ uri: "http://github.com/felipecfb.png" }} />

        <S.Form>
          <S.Title>Nome da pizza</S.Title>
          <S.Label>Selecione um tamanho</S.Label>
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

          <S.FormRow>
            <S.InputGroup>
              <S.Label>Número da mesa</S.Label>
              <Input keyboardType="numeric" />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Quantidade</S.Label>
              <Input keyboardType="numeric" />
            </S.InputGroup>
          </S.FormRow>

          <S.Price>Valor de R$ 00,00</S.Price>

          <Button title="Confirmar pedido" />
        </S.Form>
      </S.ContentScroll>
    </S.Container>
  );
}
