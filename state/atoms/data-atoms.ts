import { atom, selector } from "recoil";

function loadInitialState() {
  try {
    const localData = localStorage.getItem("user-data");

    if (!localData) {
      return {
        email: "",
        nickname: "",
        picture: "",
        updated_at: "",
      };
    } else {
      return {
        email: "",
        nickname: "",
        picture: "",
        updated_at: "",
      };
    }
  } catch (error) {
    console.error("Error al cargar el estado inicial de localStorage: ", error);
    return {
      email: "",
      nickname: "",
      picture: "",
      updated_at: "",
    };
  }
}

const dataAtom = atom({
  key: "data-atom",
  default: loadInitialState(),
});

const dataSelector = selector({
  key: "data-selector",
  get: ({ get }) => {
    const userData = get(dataAtom);
    localStorage.setItem("user-data", JSON.stringify(userData));
    return userData;
  },
  set: ({ set }, newValue) => {
    set(dataAtom, newValue);
    localStorage.setItem("user-data", JSON.stringify(newValue));
  },
});

export { dataAtom, dataSelector };
