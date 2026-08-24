export interface Cat {
  _id?: string;
  name: string;
  breed: string;
  description: string;
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  lifespan: number;
  energyLevel: string;
  imageUrl: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BestMatchCat {
  name: string;
  breed: string;
  reason: string;
}

export interface RecommendedCat {
  name: string;
  breed: string;
  reason: string;
}

export interface AiRecommendData {
  bestMatch?: BestMatchCat;
  recommendations?: RecommendedCat[];
  summary?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface McpTestResponse {
  success: boolean;
  data: string;
  err?: any;
}
