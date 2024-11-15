import { Livro } from '../../models/livroModel';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LivroService } from '../../service/LivroService/livro.service';

@Component({
  selector: 'app-criar-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './criar-modal.component.html',
  styleUrls: ['./criar-modal.component.scss']
})

export class CriarModalComponent {
  constructor(private fb: FormBuilder, private livroService: LivroService) {
    this.form = this.fb.group({
      id:     [''],
      titulo: ['', [Validators.required]],
      autor:  [''],
      genero: [''],
      ano:    [''],
    });
  }

  @Output() close = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<any>();
  @Input() livro: any = null;
  showErrorMessage: boolean = false;
  livros: Livro[] = [];
  form!: FormGroup;
  isModalOpen = false;

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    if (this.livro) {
      this.form.patchValue({
        id: this.livro.id,
        titulo: this.livro.titulo,
        autor: this.livro.autor,
        genero: this.livro.genero,
        ano: this.livro.ano
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const livroData = this.form.value;
      if (livroData.id) {
        this.editaLivro(livroData)
      } else {
        const livro: Livro = {
          id: 0,
          titulo: this.form.value.titulo,
          autor: this.form.value.autor,
          genero: this.form.value.genero,
          ano: this.form.value.ano
        }
        this.adicionaLivro(livro);
      }
    }else if(this.form.invalid){
      this.showErrorMessage = true;
      this.form.markAllAsTouched();
    }
  }

  adicionaLivro(livro:any){
    this.livroService.adicionarLivro(livro).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Livro Adicionado Com Sucesso!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.onClose();
          location.reload();
        });
      },
      error: (err: { error: any; }) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro Ao Adicionar o Livro!',
          text: err.error,
          confirmButtonText: 'OK'
        });
      }
    });
  }

  editaLivro(livroData: any){
    this.livroService.editarLivro(this.livro.id, livroData).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Livro Editado Com Sucesso!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.onClose();
          location.reload();
        });
      },
      error: (err: { error: any; }) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro Ao Editar o Livro!',
          text: err.error,
          confirmButtonText: 'OK'
        });
      }
    });
  }

}
