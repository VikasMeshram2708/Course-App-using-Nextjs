type Course = {
  id: string;
  price: string;
  title: string;
  embeddedUrl: string;
  description: string;
  duration: string;
  tags: string[];
  thumbnail: string;
  creator: string;
  author: string;
};
export interface OrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: string[];
  created_at: number;
}
