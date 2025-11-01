import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 1,
  },
  screenContent: {
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 220,
    zIndex: 1,
  },
  formBox: {
    width: 350,
    backgroundColor: '#1CBDCF',
    borderRadius: 20,
    margin: 16,
  },
  formBody: {
    gap: 1,
    padding: 20,
  },
  errorContainer: {
    width: '100%',
    backgroundColor: '#FFDEDE',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D8000C',
  },
  errorText: {
    color: '#D8000C',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
})