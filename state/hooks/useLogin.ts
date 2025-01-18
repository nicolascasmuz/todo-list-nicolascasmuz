import { useEffect } from "react";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { dataAtom } from "../atoms/data-atoms";
import { userAtom, userSelector } from "../atoms/user-atoms";

function useLogin() {
  const setUserDataState = useSetRecoilState(userAtom);
  const userDataLoadable = useRecoilValueLoadable(userSelector);
  const setDataState = useSetRecoilState(dataAtom);

  useEffect(() => {
    if (userDataLoadable.state === "hasValue" && userDataLoadable.contents) {
      setDataState(userDataLoadable.contents);
    }
  }, [userDataLoadable]);

  async function login(userData) {
    setUserDataState(userData);
  }

  return login;
}

export { useLogin };
