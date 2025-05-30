export type DecodedToken = {
  email: string;
  exp: number;
  iat: number;
  licensePlate: string;
  subscriptionId: string;
  id: string;
};

export type Location = {
  uid: string;
  locations_ud: string;
  name: string;
  address: string;
  coordinates: {
    x: string;
    y: string;
  };
  open_hours: string;
  message: string;
  halls_count: number;
}; 