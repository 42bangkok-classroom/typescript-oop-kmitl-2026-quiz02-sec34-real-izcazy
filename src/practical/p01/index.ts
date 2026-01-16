import axios from "axios";


type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type User = {
  id: number;
  name: string;
  phone: string;
  address: Address;
};

type PostalUser = {
  id: number;
  name: string;
  phone: string;
  address: Address;
};

export async function getPostalAddress(): Promise<PostalUser[]> {
  try {
    const { data: users } = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!users || users.length === 0) {
      return [];
    }

    return users.map(user => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address
    }));
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
}
