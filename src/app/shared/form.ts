export interface login {
  email: string;
  password: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface addCar {
  name: string;
  phone: string;
  model: string;
  color: string;
}
