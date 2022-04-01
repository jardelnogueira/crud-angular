import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Curso } from '../models/curso';
import { CursosService } from '../servicos/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  displayedColumns = ['nome', 'categoria', 'professor', 'duracao'];


  constructor(private cursosService: CursosService,
    public dialog: MatDialog) {
    // this.cursosService = new CursosService();
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(error =>{
        this.onError('Banco de dados não pode ser acessado!');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
