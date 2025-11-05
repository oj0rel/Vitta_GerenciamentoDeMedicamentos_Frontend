import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    backgroundColor: '#1CBDCF',
    margin: 14,
    borderRadius: 10,
    width: 350,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    color: '#fff',
    paddingLeft: 12,
    paddingRight:12,
  },
  textPressableContent: {
    color: '#1CBDCF',
  },
});