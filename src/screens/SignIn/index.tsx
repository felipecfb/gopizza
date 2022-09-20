import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import brandImg from "@assets/brand.png";

import { useAuth } from "@hooks/auth";

import * as S from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, forgotPassword, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <S.Content>
          <S.Brand source={brandImg} />

          <S.Title>Login</S.Title>
          <Input
            placeholder="Email address"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <S.ForgotPasswordButton onPress={handleForgotPassword}>
            <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
