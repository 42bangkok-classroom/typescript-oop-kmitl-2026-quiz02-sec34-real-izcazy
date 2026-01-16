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

export const filterUserById = async (id: number): Promise<User | string> => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users: User[] = res.data.map((u: {
      id: number;
      name: string;
      phone: string;
      address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: { lat: string; lng: string };
      };
    }) => ({
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
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      return "Invalid id";
    }

    return foundUser;
  } catch (err) {
    throw err;
  }
};

