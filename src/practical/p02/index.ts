import axios from "axios";

type Geo = {
  lat: string | null;
  lng: string | null;
};

type Address = {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
};

type User = {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
};

type NewUserInput = {
  name?: string;
  phone?: string;
  address?:
    | {
        street?: string;
        suite?: string;
        city?: string;
        zipcode?: string;
        geo?: {
          lat?: string;
          lng?: string;
        };
      }
    | null;
} | null;

export const addUser = async (
  newUserData: NewUserInput | null
): Promise<User[]> => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    const users: User[] = res.data.map((u: User) => ({
      id: u.id,
      name: u.name ?? null,
      phone: u.phone ?? null,
      address: u.address
        ? {
            street: u.address.street ?? null,
            suite: u.address.suite ?? null,
            city: u.address.city ?? null,
            zipcode: u.address.zipcode ?? null,
            geo: u.address.geo
              ? {
                  lat: u.address.geo.lat ?? null,
                  lng: u.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    }));

    if (newUserData === null) {
      return users;
    }

    const lastId = users[users.length - 1].id;
    const newUser: User = {
      id: lastId + 1,
      name: newUserData.name ?? null,
      phone: newUserData.phone ?? null,
      address: newUserData.address
        ? {
            street: newUserData.address.street ?? null,
            suite: newUserData.address.suite ?? null,
            city: newUserData.address.city ?? null,
            zipcode: newUserData.address.zipcode ?? null,
            geo: newUserData.address.geo
              ? {
                  lat: newUserData.address.geo.lat ?? null,
                  lng: newUserData.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    };

    return users.concat(newUser);
  } catch (err) {
    throw err;
  }
};
