import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { isJsonString } from "./isJsonString";

const BANANA = "banana";
const REFRESH_BANAAN_URL = "https://banana.com/banana";

interface Fruit {
  banana: string;
  refreshBanana: string;
}

export function isBanana(fruit: any): fruit is Fruit {
  return (fruit as Fruit).banana !== undefined;
}

export const setBanana = async (banana: Fruit) => {
  if (!isBanana(banana)) return null;

  try {
    const jsonBanana = JSON.stringify(banana);
    await AsyncStorage.setItem(BANANA, jsonBanana);
  } catch (error) {
    console.error("setBanana: ", error);
  }
};

export const getBanana = async (): Promise<Fruit | null> => {
  try {
    const jsonBanana = await AsyncStorage.getItem(BANANA);
    if (!jsonBanana || !isJsonString(jsonBanana)) return null;

    const banana = JSON.parse(jsonBanana);
    return isBanana(banana) ? banana : null;
  } catch (error) {
    console.error("getBanana: ", error);
  }
  return null;
};

export const removeBanana = async () => {
  try {
    await AsyncStorage.removeItem(BANANA);
  } catch (error) {
    console.error("removeBanana: ", error);
  }
};
