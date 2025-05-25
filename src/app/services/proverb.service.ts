import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://afghan-proverbs-backend-1.onrender.com/proverbs';

@Injectable({ providedIn: 'root' })
export class ProverbService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(API_URL);
  }

  getById(id: number) {
    return this.http.get(`${API_URL}/${id}`);
  }

  getRandom() {
    return this.http.get(`${API_URL}/random`);
  }

  addProverb(proverb: any) {
    return this.http.post(API_URL, proverb);
  }

  updateProverb(id: number, proverb: any) {
    return this.http.put(`${API_URL}/${id}`, proverb);
  }

  deleteProverb(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  search(keyword: string, category?: string) {
    let url = `${API_URL}?search=${keyword}`;
    if (category) url += `&category=${category}`;
    return this.http.get(url);
  }
}