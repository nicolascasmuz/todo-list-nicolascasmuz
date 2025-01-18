import { atom, selector } from "recoil";
// import { API_BASE_URL } from "../API_BASE_URL";

const userAtom = atom({
  key: "auth-atom",
  default: {
    email: "",
    nickname: "",
    picture: "",
    updated_at: "",
  },
});

const userSelector = selector({
  key: "auth-selector",
  get: async ({ get }) => {
    const userDataValue = get(userAtom);

    if (userDataValue) {
      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userDataValue),
      });
      const data = await response.json();

      return data;
    } else {
      return false;
    }
  },
});

export { userAtom, userSelector };
