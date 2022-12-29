import { group } from '@angular/animations';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoService } from 'src/app/modules/shared/services/recurso.service';
import { TipoRecursoService } from 'src/app/modules/shared/services/tipo-recurso.service';


export interface TipoRecurso {
  rectipo_codigo: string;
  rectipo_nombre: string;
  tiporecurso: any;
}

@Component({
  selector: 'app-newrecurso',
  templateUrl: './newrecurso.component.html',
  styleUrls: ['./newrecurso.component.css']
})
export class NewrecursoComponent implements OnInit {

  public recursoForm: FormGroup;
  Selecionado:string="";
  estadoFormulario: string = "";
  tipoRecursos: TipoRecurso[] = [];
  tipoRecursosPadres:TipoRecurso[]=[];
  tipoRecursoHijos:TipoRecurso[]=[];
  constructor(
    private fb: FormBuilder,
    private tipoRecursoService: TipoRecursoService,
    private RecursoService: RecursoService,
    private dialogRef: MatDialogRef<NewrecursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.estadoFormulario = "Agregar";

    this.recursoForm = this.fb.group({
      rec_codigo: ['', Validators.required],
      rec_decripcion: ['', Validators.required],
      fac_codigo: ['', Validators.required],
      rec_capmax: ['', Validators.required],
      rectipo_codigo: ['', Validators.required],
      rectipo_padre: ['',Validators.required],
      rec_nombre: ['', Validators.required],
      ubi_codigo: ['', Validators.required]
    });


    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  hijos(id:string){
   //console.log("hujos"+id);
   this.tipoRecursoService.getRecursosHijos(id)
   .subscribe((data: any) => {
   // console.log("hijos: ",data);
    this.procesarTipoCategoriaHijos(data);
   })
  }

  procesarTipoCategoriaHijos(res: any){
    const dataTipoRecursosHijos : TipoRecurso[] = [];
    if( res.metadata[0].code == "00") {
      let listHijos = res.tiporecursoResponse.tiporecurso;
      listHijos.forEach((element : TipoRecurso) => {
        dataTipoRecursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.tipoRecursoHijos = dataTipoRecursosHijos;
    }
  }

  ngOnInit(): void {
    this.getTipoRecursos();
  }

  onSave() {
    
    let data = {
      rec_codigo: this.recursoForm.get('rec_codigo')?.value,
      rectipo_codigo: this.recursoForm.get('rectipo_codigo')?.value,
      fac_codigo: this.recursoForm.get('fac_codigo')?.value,
      rec_capmax: this.recursoForm.get('rec_capmax')?.value,
      rec_nombre: this.recursoForm.get('rec_nombre')?.value,
      rec_decripcion: this.recursoForm.get('rec_decripcion')?.value,
      ubi_codigo: this.recursoForm.get('ubi_codigo')?.value
  
    }
    const uploadImageData = new FormData();
    uploadImageData.append('rec_codigo', data.rec_codigo);
    uploadImageData.append('rectipo_codigo', data.rectipo_codigo);
    uploadImageData.append('fac_codigo', data.fac_codigo);
    uploadImageData.append('rec_capmax', data.rec_capmax);
    uploadImageData.append('rec_nombre', data.rec_nombre);
    uploadImageData.append('rec_decripcion', data.rec_decripcion);
    uploadImageData.append('ubi_codigo', data.ubi_codigo);

    if(this.data !=null){
      //actaulizar registro
      this.RecursoService.updateRecursos(uploadImageData, this.data.rec_codigo)
      .subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2);
        console.log("error al guardar",error)
      })

    }else{

    // llamamos al servicio guardar producto

  this.RecursoService.saveRecursos(uploadImageData)
    .subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close(1)
    }, (error: any) => {
      this.dialogRef.close(2);
      console.log("error al guardar",error)
    })
  }

  }

  onCancel() {
    this.dialogRef.close(3);
  }

  getTipoRecursos() {
    this.tipoRecursoService.getTipoRecursos().subscribe((data: any) => {
      this.tipoRecursos = data.tiporecursoResponse.tiporecurso;
      this.tipoRecursosPadres = this.tipoRecursos.filter(tr => tr.tiporecurso == null);
     // this.tipoRecursoHijos= this.tipoRecursos.filter(tr => tr.rectipo_codigo == "Salon")
   

    }, (error: any) => {
      console.log("Error consultar Tipo Recursos", error);
    })
  }

  updateForm(data: any) {
    this.recursoForm = this.fb.group({
      rec_codigo: [data.rec_codigo, Validators.required],
      rectipo_codigo: [data.rectipo_codigo , Validators.required],
      fac_codigo: [data.fac_codigo, Validators.required],
      rec_capmax: [data.rec_capmax , Validators.required],
      rectipo_padre: ['',Validators.required],
      rec_nombre: [data.rec_nombre, Validators.required],
      rec_decripcion: [data.rec_decripcion, Validators.required],
      ubi_codigo: [data.ubi_codigo, Validators.required]
    });
  }
 
}
