import { TouchableOpacity, Text } from "react-native";

export default function MyButton({ title, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 15, backgroundColor: "#4f51be", marginVertical: 5 }}>
      <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );
}