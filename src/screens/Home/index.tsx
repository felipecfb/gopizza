import React, { useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";

import happyEmoji from "@assets/happy.png";

import { Search } from "@components/Search";

import { useTheme } from "styled-components/native";
import * as S from "./styles";
import { ProductCard, ProductProps } from "@components/ProductCard";

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetingEmoji source={happyEmoji} />
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </S.Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <S.MenuHeader>
        <S.Title>Cardápio</S.Title>
        <S.MenuItemsNumber>10 pizzas</S.MenuItemsNumber>
      </S.MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </S.Container>
  );
}
