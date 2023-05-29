const NAME_KEY: string = "NAME";
const ID_KEY: string = "ID";
const LOGGED_KEY: string = "LOGGED";
const TOKEN_KEY: string = "TOKEN";
const ADMIN_KEY: string = "ADMIN";

export function saveName(name: string): void {
  sessionStorage.setItem(NAME_KEY, name);
}

export function getName(): string {
  let name: string | null = sessionStorage.getItem(NAME_KEY);
  if (name == null) {
    return "";
  }
  return name;
}

export function saveID(id: number): void {
  sessionStorage.setItem(ID_KEY, id.toString());
}

export function getID(): number {
  let id: string | null = sessionStorage.getItem(ID_KEY);
  if (id == null) {
    return -1;
  }
  return +id;
}

export function loggedIn(): void {
  sessionStorage.setItem(LOGGED_KEY, "true");
}

export function notLoggedIn(): void {
  sessionStorage.setItem(LOGGED_KEY, "false");
}

export function isLoggedIn(): boolean {
  const logged: string | null = sessionStorage.getItem(LOGGED_KEY);

  if (logged == null) {
    return false;
  }

  return logged === "true";
}

export function getToken(): string {
  let token: string | null = sessionStorage.getItem(TOKEN_KEY);
  if (token == null) {
    return "";
  }
  return token;
}

export function saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function isAdmin(): boolean {
  let admin: string | null = sessionStorage.getItem(ADMIN_KEY);
  if (admin == null) {
    return false;
  }
  return admin === "true";
}

export function saveAdmin(admin: boolean): void {
  sessionStorage.setItem(ADMIN_KEY, admin.toString());
}