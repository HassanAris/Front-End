import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../../models/livroModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  listarLivros(): Observable<Livro[]> {
    var teste = this.http.get<Livro[]>(`${this.apiUrl}`)
    return this.http.get<Livro[]>(`${this.apiUrl}`);
  }

  adicionarLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}`, livro);
  }

  editarLivro(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  excluirLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterLivro(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }
}
