export interface UserCommentResponse {
  id: number;
  content: string;
  createdAt: string;
  rating: number;
  userId: number;
  userName: string;
  userLastName: string;
  businessId: number;
  businessName: string;
}

export interface UserCommentRequest {
  content: string;
  userId: number;
  businessId: number;
  rating: number;
}

export interface AverageRatingResponse {
  businessId: number;
  averageRating: number;
  totalComments: number;
}
