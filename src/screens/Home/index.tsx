import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import happyEmoji from "@assets/happy.png";

import { Search } from "@components/Search";

import { useTheme } from "styled-components/native";
import * as S from "./styles";
import { ProductCard } from "@components/ProductCard";

export function Home() {
  const { COLORS } = useTheme();

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

      <ProductCard
        data={{
          id: "1",
          name: "Pizza",
          description: "Qualquer coisa",
          photo_url: "https://github.com/felipecfb.png",
        }}
      />
    </S.Container>
  );
}
