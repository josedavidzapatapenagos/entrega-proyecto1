import { View, Text, TextInput } from "react-native";

export default function Input({ label, ...props }: any) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{label}</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        {...props}
      />
    </View>
  );
}