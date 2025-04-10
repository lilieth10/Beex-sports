export type Match = {
  id: string;
  name: string;
  complexId: string;
  complexName: string;
  date: string;
  time: string;
  players: {
    current: number;
    required: number;
  };
  level: 'novato' | 'intermedio' | 'avanzado';
  description?: string;
};

// Mock data for matches
const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    name: 'Partido Amistoso',
    complexId: '1',
    complexName: 'Complejo Deportivo Central',
    date: '2023-10-25',
    time: '18:00',
    players: {
      current: 6,
      required: 10,
    },
    level: 'intermedio',
    description: 'Partido amistoso de fútbol 5. Todos son bienvenidos!',
  },
  {
    id: '2',
    name: 'Partido Rápido',
    complexId: '2',
    complexName: 'Club Deportivo Norte',
    date: '2023-10-26',
    time: '19:30',
    players: {
      current: 4,
      required: 8,
    },
    level: 'novato',
    description: 'Para principiantes, buen ambiente y sin presiones.',
  },
  {
    id: '3',
    name: 'Torneo Semiprofesional',
    complexId: '3',
    complexName: 'Polideportivo Municipal',
    date: '2023-10-27',
    time: '20:00',
    players: {
      current: 8,
      required: 10,
    },
    level: 'avanzado',
    description: 'Nivel competitivo, se recomienda experiencia previa.',
  },
  {
    id: '4',
    name: 'Entrenamiento Grupal',
    complexId: '4',
    complexName: 'Club Atlético River',
    date: '2023-10-28',
    time: '17:00',
    players: {
      current: 5,
      required: 12,
    },
    level: 'intermedio',
    description: 'Entrenamiento y partido amistoso para mejorar habilidades.',
  },
  {
    id: '5',
    name: 'Partido Recreativo',
    complexId: '5',
    complexName: 'Club Deportivo Sur',
    date: '2023-10-29',
    time: '16:30',
    players: {
      current: 3,
      required: 6,
    },
    level: 'novato',
    description: 'Para pasar un buen rato entre amigos.',
  },
  {
    id: '6',
    name: 'Liga Amateur',
    complexId: '1',
    complexName: 'Complejo Deportivo Central',
    date: '2023-10-30',
    time: '19:00',
    players: {
      current: 7,
      required: 10,
    },
    level: 'intermedio',
    description: 'Partido de liga amateur, ambiente competitivo pero amistoso.',
  },
  {
    id: '7',
    name: 'Campeonato Local',
    complexId: '2',
    complexName: 'Club Deportivo Norte',
    date: '2023-10-31',
    time: '18:30',
    players: {
      current: 9,
      required: 12,
    },
    level: 'avanzado',
    description: 'Alta competencia, se requiere buen nivel técnico.',
  },
];

export const matchService = {
  // Get all matches
  getMatches: async (): Promise<Match[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MATCHES;
  },

  // Get matches by level
  getMatchesByLevel: async (level: 'novato' | 'intermedio' | 'avanzado'): Promise<Match[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return MOCK_MATCHES.filter(match => match.level === level);
  },

  // Join a match
  joinMatch: async (matchId: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Just return success for the demo
    return true;
  },

  // Create a new match
  createMatch: async (match: Omit<Match, 'id'>): Promise<Match> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMatch = {
      id: String(Date.now()),
      ...match,
    };
    
    // In a real app, we would add this to the backend
    // For the demo, just return the new match
    return newMatch;
  },
}; 