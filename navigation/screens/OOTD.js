/*
 OOTD.js is the screen that shows the User's outfit of the day
*/

// Imports
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";

// Local Imports
import { ClothesContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserIDContext";
import { OutfitContext } from "../../context/OOTDContext";
import { getOOTD } from "../utils/Fetches";
import { OutfitOfTheDay } from "../utils/OutfitRender";
import { styles } from "../../assets/StyleSheets/OOTDStyle";

const { width } = Dimensions.get("window");

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

/*
Function: outfittoJSX

Purpose: Convert an array of pieceids to JSON representations
  using the ClothesContext

Input : ids : Arrays of outfits to be converted
        context : the clothes context that stores item representations in the app
*/
function outfittoJSX(ids, context) {
  const test = ids.map(function (value) {
    if (value === 0) {
      return { image: " ", type: " ", color: " " };
    } else {
      var val = context.find((element) => element.pieceid === value);
      return val;
    }
  });
  return test;
}

/**
 * Function : OOTD
 * Purpose : displays the user's outfit of the day if available
 */
export default function OOTD({ route, navigation }) {
  const uid = React.useContext(UserContext);
  const context = React.useContext(ClothesContext);

  const [ootd, setOOTD] = React.useState([]);
  const [renderedootd, setOutfits] = React.useState([]);

  const [loading, setLoad] = React.useState(true);


  // update the OOTD everytime the user navigates on the screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOOTD(uid, setOOTD);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (ootd.length > 0) {
      setOutfits(
        outfittoJSX(
          ootd.filter((value) => value !== 0),
          context
        )
      );
    }
  }, [ootd]);

  /*
  Once the getFits button is pressed, renders
  Output : Spins until the recommendation comes through
  */
  const renderAlert = () => (
    <MaterialCommunityIcons
      name="alert"
      size={width}
      color={colors.blue}
      style={{
        opacity: 0.05,
        top: 30,
        alignItems: "center",
        position: "relative",
        paddingTop: 200,
      }}
    />
  );

  const renderNone = () => (
    <View style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        <Text style={[styles.text, styles.price]}>
          {"No Outfit of the Day Available"}
        </Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor : "white" }}>
      {/* renders the OOTD if available */}
      <StatusBar hidden={false} />
      {renderedootd.length === 0 && renderAlert()}
      {renderedootd.length === 0 && renderNone()}
      <View style={styles.swiperContainer}>
        {renderedootd.length > 0 && (
          <View style={{ position: "absolute", zindex: 100 }}>
            <Text style={[styles.text, styles.price]}>
              {"Outfit of the Day"}
            </Text>
            <OutfitOfTheDay
              card={renderedootd.filter((value) => value !== 0)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
