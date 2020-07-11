import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, Lancamento } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
  	private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
      .subscribe(
        data => {
          const lancamentos = data['data'] as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
