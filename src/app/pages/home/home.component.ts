import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CriarModalComponent } from '../criar-modal/criar-modal.component';
import { LivroService } from '../../service/LivroService/livro.service';
import { Livro } from '../../models/livroModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CriarModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent {

  constructor(private livroService: LivroService, private datePipe: DatePipe) {}

  livros: Livro[] = [];
  events: any[] = [];
  livroParaEditar: Livro | null = null;
  isModalOpen = false;
  modalService: any;
  selectedEvent: any;

  ngOnInit(): void {
    this.carregarLivros();
  }

  openCreateEventModal() {
    this.isModalOpen = true;
    this.livroParaEditar = null;
  }

  openEditModal(livro: Livro) {
    this.livroParaEditar = livro;
    this.isModalOpen = true;
  }

  closeCreateEventModal() {
    this.isModalOpen = false;
    this.livroParaEditar = null;
  }

  addEvent(event: any) {
    this.events.push(event);
    this.closeCreateEventModal();
  }

  editEvent() {
    this.isModalOpen = true;
  }

  updateEvent(updatedEvent: any) {
    const index = this.livros.findIndex(e => e == updatedEvent);
    if (index !== -1) {
      this.livros[index] = updatedEvent;
    }
  }

  excluirLivro(id: number): void {
    this.livroService.excluirLivro(id).subscribe(() => {
      this.carregarLivros();
    });
  }

  carregarLivros(): void {
    this.livroService.listarLivros().subscribe((data) => {
      this.livros = data;
    });
  }

}
