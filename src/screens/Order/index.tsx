import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProductProps } from "@components/ProductCard";

import { PIZZA_TYPES } from "@utils/pizzaTypes";

import { OrderNavigationProps } from "@src/@types/navigation";

import * as S from "./styles";

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number;
  };
};

export function Order() {
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [size, setSize] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as OrderNavigationProps;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => setPizza(response.data() as PizzaResponse))
        .catch(() =>
          Alert.alert("Pedido", "Não foi possível carregar o produto")
        );
    }
  }, []);

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <S.ContentScroll>
        <S.Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </S.Header>

        <S.Photo source={{ uri: pizza.photo_url }} />

        <S.Form>
          <S.Title>{pizza.name}</S.Title>
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
