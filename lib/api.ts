const BASE_URL = "http://localhost:8080/api";

export async function fetchAPI(input: RequestInfo, options?) {
  const url = BASE_URL + input;
  let res;

  if (input == "/auth" && options?.method == "POST") {
    const response = await fetch(url, options);
    res = response;
  }
  if (input == "/todos" && options?.method == "POST") {
    const response = await fetch(url, options);
    res = response;
  }
  if (input == "/todos" && options?.method == "GET") {
    const response = await fetch(url, options);
    res = response;
  }

  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
}

export async function login(userData: object) {
  if (userData) {
    const data = await fetchAPI("/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    localStorage.setItem("user-data", JSON.stringify(data));
    return data;
  }
}

export async function createTask(taskData: object) {
  if (taskData) {
    await fetchAPI("/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
  }
}

export async function getTasks(email: string) {
  if (email) {
    const tasks = await fetchAPI("/todos", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return tasks;
  }
}

/* export async function saveToken(email: string, code: number) {
  if (email && code) {
    const token = await fetchAPI("/auth/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });
    localStorage.setItem("saved-state", JSON.stringify(token));
  }
} */
