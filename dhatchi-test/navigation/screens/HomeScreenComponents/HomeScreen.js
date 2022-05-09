import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from "react-native";

import AddScreen from "./AddScreen";
//import { ClothesContext} from '../../App';
import ClothingItem from "../../../components/ClothingItem";
import { useRoute } from "@react-navigation/native";
import { ClothesContext } from "../../../context/AppContext";
import { API, NODEPORT } from "../../../context/API";

const type_mapping = {
  //shirts
  TATS: 'Tank Top',
  SBUS: 'Button Up',
  STES: 'Tee',
  SPOS: 'Polo Shirt',
  SGRS: 'Graphic',
  SATS: 'Athletic',
  LBUS: 'Long Sleeve Button up',
  LPOS: 'Long Sleeve Polo',
  LTES: 'Long Sleeve Tee',
  LGRS: 'Long Sleeve Graphic',
  LATS: 'Long Sleeve Athletics',
  FLAS: 'Flannel',
  //Overtops
  SWST: 'SweatShirt',
  HOOT: 'Hoodie',
  BLZT: 'Blazer',
  //Jackets
  JAKC: 'Jacket',
  COAC: "Coat",
  VESC: "Vest",
  PUFTC: 'Puffer',
  //Pants
  SKIP: 'Skirt',
  YOGP: 'Yoga Pants',
  CARP: 'Cargo Pants',
  JEAP: 'Jeans',
  SWTP: 'Sweatpants',
  TRAP: 'Track Pants',
  DRSP: 'Dress Pants',
  PJMT: 'Pajamas',
  //shorts
  RGSH: 'Regular',
  SWPH: 'Swimshorts',
  SWSH: 'Sweatshorts',
  ATSH: 'Athletic Shorts',
  //Shoes
  SNEO: 'Sneakers',
  RUNO: 'Runners',
  BOTO: 'Boots',
  DRSO: 'Dress',
  SNDO: 'Sandals',
  FLIO: 'Flip Flops',
  HELO: 'Heels',
  FLTO: 'Flats',
  //Hats
  BENA: 'Beanie',
  BASA: 'Baseball',
  SNPA: 'Snapback',
  BCKA: 'Bucket',
  VIZA: 'Visor',
  HATA: 'Regular Hat',
  //Misc
  DREX: 'Dress',
  TUXX: 'Tux'

};


function get(set) {
  const requestOptions = {
    method: "GET",
  };
  fetch(`http://192.168.1.76:${NODEPORT}/wardrobe`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      set(json);
    });
}

function update(json, set) {
  var list;
  if (Object.keys(json).length !== 0) {
    list = json.map((clothes) => (
      <ClothingItem
        key={clothes.pieceid}
        id={clothes.pieceid}
        text={type_mapping[clothes.type] + " " + clothes.color}
        update={set}
        image={clothes.image}
      />
    ));
    return list;
  }
}

function addHeaderButton(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Add")} title="Add Item" />
      ),
    });
  });
}

export default function HomeScreen({ navigation, route }) {
  var context = React.useContext(ClothesContext);
  const [wd, setWd] = React.useState(context);


  const x = wd;
  const updateWD = React.useCallback((val) => {
    setWd(val);
    update(wd, updateWD);
  }, [wd]);


  if (wd.length !== context.length){
     setWd(context);
   }

  const value = update(x, updateWD);

  addHeaderButton(navigation);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.clothsWrapper}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Details")}> */}
          <View style={styles.items}>
            {value != null ? value : true}
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  clothsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeClothWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});