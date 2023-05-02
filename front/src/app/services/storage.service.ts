const NAME_KEY : string = "NAME";
const LOGGED_KEY : string = "LOGGED";
const TOKEN_KEY: string = "TOKEN";

export function saveName(name: string) : void {
    localStorage.setItem(NAME_KEY, name);
}

export function getName() : string {
  let name: string | null = localStorage.getItem(NAME_KEY);
  if (name == null) {
    return "";
  }
  return name;
}

export function loggedIn(): void {
    localStorage.setItem(LOGGED_KEY, "true");
}

export function isLoggedIn(): boolean {
    const logged: string | null = localStorage.getItem(LOGGED_KEY);

    if (logged == null) {
        return false;
    }

    return Boolean(logged);
}

export function getToken(): string {
  let token: string | null = localStorage.getItem(TOKEN_KEY);
  if (token == null) {
    return "";
  }
  return token;
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}