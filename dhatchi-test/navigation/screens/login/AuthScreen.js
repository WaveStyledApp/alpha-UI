/*
Screen: AuthScreen
Purpose: Screen that facilitates user login and signup and controls access to 
a user's wardrobe/outfits 
*/

// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import { auth } from "./FireBaseData";
import {styles} from "../../../assets/StyleSheets/AuthScreenStyle"

/*
Function: emailchecker

Purpose: validates that the given string is a valid email address

Input : email --> email to check
Outfit : True if valid False otherwise
*/
function emailchecker(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return false;
  }
  return true;
}

function AuthScreen({ route, navigation }) {
  const [validEmail, isValid] = useState(false);
  const [emptyName, isFilled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeat] = useState("");
  const [name, setName] = useState("");
  const [reenter, setReenter] = useState(true);
  const [uid, setUserID] = useState(-1);
  const [error, setError] = useState("");
  const [isError, tryAgain] = useState(true);

  const [login, setLogin] = useState(true);

  useEffect(() => {
    setError("");
  }, [email, password]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("MainApp", { id: user.uid });
      }
    });
  }, []);

  useEffect(() => {
    isValid(emailchecker(email));
  }, [email]);

  useEffect(() => {
    isFilled(name.length > 0);
  }, [name]);

  useEffect(() => {
    if (!login && password !== repeatPassword) {
      setReenter(true);
    } else {
      setReenter(false);
    }
  }, [password, repeatPassword]);

  const signup = () => {
    console.log("here");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserID(user.uid);
        setLogin(!login);
        setError("");
        tryAgain(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        tryAgain(true);
        console.log(errorMessage);
      });
  };

  const loginHandler = () => {
    setLogin(!login);
    setError("");
  };

  const signin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserID(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.image}>
      <View style={styles.card}>
        {login ? (
          true
        ) : (
          <View style={{ alignSelf: "flex-start" }}>
            <Button onPress={() => setLogin(!login)} title="Back" />
          </View>
        )}
        <Text style={styles.heading}>{login ? "Login" : "Signup"}</Text>
        <StatusBar style="auto" />
        {login ? (
          true
        ) : (
          <View style={styles.action}>
            <Ionicons name="person-outline" size={40} />
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#003f5c"
                onChangeText={(name) => setName(name)}
              />
            </View>
          </View>
        )}
        {login ? (
          true
        ) : (
          <View style={styles.validEmail}>
            {emptyName ? (
              true
            ) : (
              <Text style={{ color: "#f44336" }}>Please Enter Your Name</Text>
            )}
          </View>
        )}

        <View style={styles.action}>
          <Ionicons name="mail-outline" size={40} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>

        <View style={styles.validEmail}>
          {validEmail ? (
            true
          ) : (
            <Text style={{ color: "#f44336" }}>Please Enter a Valid Email</Text>
          )}
        </View>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" size={40} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>
        </View>
        {login ? (
          true
        ) : (
          <View style={styles.action2}>
            <Ionicons name="lock-closed-outline" size={40} />
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(pass) => setRepeat(pass)}
              />
            </View>
          </View>
        )}
        {login ? (
          true
        ) : (
          <View style={styles.validEmail}>
            {!reenter ? (
              true
            ) : (
              <Text style={{ color: "#f44336" }}>Passwords Do Not Match</Text>
            )}
          </View>
        )}
        {!login ? (
          true
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={signin}
            disabled={!validEmail || error.length > 0}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={login ? loginHandler : signup}
          disabled={!login ? !isError : false}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {error.length > 0 ? (
          <Text style={{ color: "#f44336", width: "60%", paddingVertical: 10 }}>
            {error.length > 0 ? error : true}{" "}
          </Text>
        ) : (
          true
        )}
      </View>
    </View>
  );
}


export default AuthScreen;
