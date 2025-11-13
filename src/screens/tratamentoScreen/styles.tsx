import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  flatList: {
    flex: 1,
    margin: 10,
    width: "100%",
  },
  cardsContainer: {
    justifyContent: "center",
  },
  cardContent: {
    backgroundColor: '#1CBDCF',
    margin: 14,
    borderRadius: 10,
    width: 350,
    justifyContent: "flex-start",
    paddingVertical: 10,
    gap: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textContent: {
    color: '#fff',
    paddingLeft: 12,
    paddingRight:12,
  },
  textPressableContent: {
    color: '#1CBDCF',
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    justifyContent: "flex-start",
    paddingHorizontal: 14,
  },
  cardBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-end", 
    marginRight: 14,
    marginTop: 6,
  },
  pressableButton: {
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 50,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: "row",
    gap: 20,
    paddingLeft: 12,
    marginTop: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
})
