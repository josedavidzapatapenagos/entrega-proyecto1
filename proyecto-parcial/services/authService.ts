type User = {
  id: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

let users: User[] = [];

export const registerUser = (user: User) => {
  users.push(user);
};

export const loginUser = (email: string, password: string) => {
  return users.find(
    (u) => u.email === email && u.password === password
  );
};