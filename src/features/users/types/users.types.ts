export interface UserLogin {
  uuid: string;
  username: string;
  password: string;
  md5: string;
  sha1: string;
  registered: string;
}

export interface UserGeo {
  lat: string;
  lng: string;
}

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeo;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  login: UserLogin;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  city: string;
  company: string;
}

export function mapResponseToUser(response: UserResponse): User {
  return {
    id: response.id,
    fullName: `${response.firstname} ${response.lastname}`,
    email: response.email,
    phone: response.phone,
    username: response.login.username,
    website: response.website,
    city: response.address.city,
    company: response.company.name,
  };
}
