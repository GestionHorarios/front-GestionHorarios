import { group } from '@angular/animations';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoService } from 'src/app/modules/shared/services/recurso.service';



export interface Recurso{
  rec_id: number,
  rec_codigo: number,
  rec_tipo: string,
  rec_nombre:string,
  rec_descripcion: string
  rec_capacidadmax:number;

}

@Component({
  selector: 'app-newrecurso',
  templateUrl: './newrecurso.component.html',
  styleUrls: ['./newrecurso.component.css']
})
export class NewrecursoComponent implements OnInit {

  public recursoForm: FormGroup;
  estadoFormulario: string="";
  recursos: Recurso[]=[];
  constructor( private fb: FormBuilder, private RecursoService: RecursoService, 
    private dialogRef: MatDialogRef<NewrecursoComponent>,


    @Inject(MAT_DIALOG_DATA) public data:any ) {

      console.log(data);
      this.estadoFormulario ="Agregar";

    this.recursoForm = this.fb.group( {
      rec_codigo: ['', Validators.required ],
      rec_descripcion: ['', Validators.required ],
      rec_cod_facultad: ['', Validators.required],
      rec_capacidadmax: ['', Validators.required ],
      rec_tipo: ['', Validators.required ],
      rec_nombre: ['', Validators.required]
      
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario="Actualizar";
    }

   }

  ngOnInit(): void {

   this.getRecursos()
  }

  onSave(){
    let data ={
      rec_codigo: this.recursoForm.get('rec_codigo')?.value,
      rec_descripcion: this.recursoForm.get('rec_descripcion')?.value,
      rec_tipo: this.recursoForm.get('rec_tipo')?.value
    }
    if(this.data != null){
      //update registro
      this.RecursoService.updateRecursos(data, this.data.rec_id)
          .subscribe((data:any)=>{
            this.dialogRef.close(1);
          },(error:any) =>{
            this.dialogRef.close(2);
          })
    }else{
      // create new registry
      this.RecursoService.saveRecursos(data)
      .subscribe((data:any) =>{
        console.log(data);
        this.dialogRef.close(1)
      },(error:any)=>{
        this.dialogRef.close(2);
      })
      
    }
   


  }

  onCancel(){

    this.dialogRef.close(3);

  }

  getRecursos(){
    this.RecursoService.getRecursos().subscribe((data:any)=>{

      this.recursos = data.recursoResponse.recurso;    
    },(error:any)=>{
      console.log("Error al consultar  Recursos ")
    })
  }
  updateForm(data:any){
    this.recursoForm = this.fb.group({
      rec_codigo: [data.rec_codigo, Validators.required],
      rec_descripcion: [data.rec_descripcion, Validators.required],
      rec_tipo: [data.rec_tipo, Validators.required]
    });

  }

  

 


}
