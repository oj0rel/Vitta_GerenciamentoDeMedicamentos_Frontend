import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    width: 400,
    backgroundColor: '#1CBDCF',
    borderRadius: 20,
    margin: 16,
  },
  formBody: {
    gap: 1,
    padding: 20,
  },
  formRequestBody: {
    marginBottom: 14
  },
  tittle: {
    color: '#000',
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
  },
  inputBox: {
    backgroundColor: '#fff',
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 10,
  }
});
