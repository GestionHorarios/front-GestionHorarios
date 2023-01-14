import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewrecursoComponent } from '../../recurso/components/newrecurso/newrecurso.component';
import { AsignaccionService } from '../../shared/services/asignaccion.service';
import { FacultadService } from '../../shared/services/facultad.service';
import { RecursoService } from '../../shared/services/recurso.service';
import { TipoRecursoService } from '../../shared/services/tipo-recurso.service';
import { UbicacionService } from '../../shared/services/ubicacion.service';

export interface Recurso {
  rec_codigo: string;
  rec_id:number;
  rectipo_nombre: string;
  tiporecurso: any;
}

export interface facultadeselement{

  fac_codigo: string;
  fac_nombre: string;
  ubicacion: any ;

}

@Component({
  selector: 'app-new-asignaccion',
  templateUrl: './new-asignaccion.component.html',
  styleUrls: ['./new-asignaccion.component.css']
})
export class NewAsignaccionComponent implements OnInit {
  public AsignaccionForm: FormGroup;
  estadoFormulario: string="";
 recursos:Recurso[]=[];
  tipoRecursoHijos:Recurso[]=[];
  tipoRecursoI:Recurso[]=[];
  facultades: facultadeselement[]=[];

  constructor(
    private fb: FormBuilder,
    private tipoRecursoService: TipoRecursoService,
    private RecursosService: RecursoService,
    private AsignaccionService: AsignaccionService,
    private facultadesService:FacultadService,
    private ubicacionesService:UbicacionService,
    private dialogRef: MatDialogRef<NewAsignaccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

    this.estadoFormulario="Agregar";

    this.AsignaccionForm = this.fb.group({
      facultad:['',],
      hijos_recurso: ['',Validators.required],
      recurso_hijo: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getTipoFacultades();
  }

  onSave(){
    let data ={

      idrecurso: this.AsignaccionForm.get('hijos_recurso')?.value,
      
      idrecuroA: this.AsignaccionForm.get('recuro_hijo')?.value

    }
    const uploadImageDate1 = new FormData();

    uploadImageDate1.append('rec_codigo', data.idrecurso);
    uploadImageDate1.append('rec_codigo2', data.idrecuroA);

    this.AsignaccionService.saveAsignaccion(uploadImageDate1)
    .subscribe((data:any)=>{
      this.dialogRef.close(1);

    },(error:any)=>{
      this.dialogRef.close(2);
      console.log("error al guardar",error);
    })
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getTipoFacultades() {
    this.facultadesService.getFacultades().subscribe((data: any) => {
      this.facultades = data.faculdatResponse.facultad;

    }, (error: any) => {
      console.log("Error consultar facultades ", error);
    })
  }


  getRecursos() {
    this.RecursosService.getRecursos().subscribe((data: any) => {
      this.recursos = data.recursoResponse.recurso;
     // this.tipoRecursosPadres = this.tipoRecursos.filter(tr => tr.tiporecurso == null);
     // this.tipoRecursoHijos= this.tipoRecursos.filter(tr => tr.rectipo_codigo == "Salon")
   

    }, (error: any) => {
      console.log("Error consultar Tipo Recursos", error);
    })
  }


  ambientes(id:string){
    //console.log("hujos"+id);
    this.AsignaccionService.getRecursosAmbientes(id)
    .subscribe((data: any) => {
    console.log("hijos: ",data);
   this.procesarTipoAmbientes(data);
    })
   }
   
   procesarTipoAmbientes(res: any){
    const dataTipoRecursosHijos : Recurso[] = [];
    if( res.metadata[0].code == "00") {
      let listHijos = res.recursoResponse.recurso;
      listHijos.forEach((element : Recurso) => {
        
        dataTipoRecursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.tipoRecursoHijos = dataTipoRecursosHijos;
    }
  }

  instrumentos(id:string){
     //console.log("hujos"+id);
     this.AsignaccionService.getRecursosInsTec(id)
     .subscribe((data: any) => {
     console.log("Instrumentos: ",data);
    this.procesarTipoInstrumentos(data);
     })

  }

  procesarTipoInstrumentos(res: any){
    const dataTipoRecursosHijos : Recurso[] = [];
    if( res.metadata[0].code == "00") {
      let listHijos = res.recursoResponse.recurso;
      listHijos.forEach((element : Recurso) => {
        
        dataTipoRecursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.tipoRecursoI = dataTipoRecursosHijos;
    }
  }

}
