import React, { useState, useCallback } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { MaterialIcons } from "@expo/vector-icons";

import happyEmoji from "@assets/happy.png";

import { useAuth } from "@hooks/auth";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

import * as S from "./styles";

export function Home() {
  const { signOut, user } = useAuth();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  const { COLORS } = useTheme();

  const navigation = useNavigation();

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

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    navigation.navigate("product", { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetingEmoji source={happyEmoji} />
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </S.Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <S.MenuHeader>
        <S.Title>Cardápio</S.Title>
        <S.MenuItemsNumber>
          {pizzas.length} {pizzas.length !== 1 ? "pizzas" : "pizza"}
        </S.MenuItemsNumber>
      </S.MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
      {user?.isAdmin && (
        <S.NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={handleAdd}
        />
      )}
    </S.Container>
  );
}
