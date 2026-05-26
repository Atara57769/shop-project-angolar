import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private baseUrl = 'https://localhost:44313/api';

  constructor(private http: HttpClient) {}

  send(message: string, history: { role: string; content: string }[]) {
    return this.http.post<{ reply: string }>(`${this.baseUrl}/chatbot`, {
      message,
      history,
      products: [] // will be filled in Hours 5-6
    });
  }

  updateVectorDb() {
    return this.http.post<{ message: string }>(`${this.baseUrl}/chatbot/update-db`, {});
  }
}
