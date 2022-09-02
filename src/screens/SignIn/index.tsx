import { Input } from "@components/Input";
import * as S from "./styles";

export function SignIn() {
  return (
    <S.Container>
      <Input
        placeholder="Email address"
        type="secondary"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input placeholder="Password" type="secondary" secureTextEntry />
    </S.Container>
  );
}
