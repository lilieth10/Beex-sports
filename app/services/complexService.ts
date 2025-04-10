import { Complex } from '../context/FavoritesContext';

// Mock data for complexes
const MOCK_COMPLEXES: Complex[] = [
  {
    id: '1',
    name: 'Complejo Deportivo Central',
    city: 'Buenos Aires',
    distance: 1.2,
    address: 'Av. Rivadavia 1500',
    image: 'https://images.unsplash.com/photo-1486882430381-e76d701e0a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '2',
    name: 'Club Deportivo Norte',
    city: 'Córdoba',
    distance: 2.5,
    address: 'Calle San Martín 450',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '3',
    name: 'Polideportivo Municipal',
    city: 'Rosario',
    distance: 3.8,
    address: 'Av. Pellegrini 2000',
    image: 'https://images.unsplash.com/photo-1523297456374-f29452e221d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '4',
    name: 'Club Atlético River',
    city: 'Buenos Aires',
    distance: 4.2,
    address: 'Av. Libertador 7500',
    image: 'https://images.unsplash.com/photo-1524549110215-6624d76a0b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '5',
    name: 'Club Deportivo Sur',
    city: 'Mendoza',
    distance: 5.0,
    address: 'Calle Belgrano 600',
    image: 'https://images.unsplash.com/photo-1489805549589-3c5ae55fe740?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
];

export const complexService = {
  // Get all complexes
  getComplexes: async (): Promise<Complex[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_COMPLEXES;
  },

  // Search complexes by name or city
  searchComplexes: async (query: string): Promise<Complex[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return MOCK_COMPLEXES.filter(
      complex => 
        complex.name.toLowerCase().includes(normalizedQuery) || 
        complex.city.toLowerCase().includes(normalizedQuery)
    );
  },

  // Get complex by ID
  getComplexById: async (id: string): Promise<Complex | undefined> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return MOCK_COMPLEXES.find(complex => complex.id === id);
  },
}; 