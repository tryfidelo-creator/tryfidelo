export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'price_offer';
  priceOffer?: number;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  agreedPrice?: number;
  isPriceAgreed: boolean;
  relatedTo: 'listing' | 'service' | 'delivery';
  relatedId: string;
  createdAt: string;
  updatedAt: string;
}