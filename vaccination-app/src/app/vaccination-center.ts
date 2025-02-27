export interface VaccinationCenter {
    id: number;
    name: string;
    address: string;
    postalCode: string;
    city: string;
  }
  
  export interface Doctor {
    id: number;
    name: string;
    centerId: number; // Clé étrangère vers le centre
  }
  