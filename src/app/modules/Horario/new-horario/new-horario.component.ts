import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewAsignaccionComponent } from '../../asignaccion/new-asignaccion/new-asignaccion.component';
import { AsignaccionService } from '../../shared/services/asignaccion.service';
import { FacultadService } from '../../shared/services/facultad.service';
import { HorarioService } from '../../shared/services/horario.service';
import { RecursoService } from '../../shared/services/recurso.service';
import { TipoRecursoService } from '../../shared/services/tipo-recurso.service';
import { UbicacionService } from '../../shared/services/ubicacion.service';

export interface Recurso {
  rec_codigo: string;
  rec_id:number;
  rectipo_nombre: string;
  tiporecurso: any;
}

export interface Asignaturacurso{

  cur_nombre:string;
  cur_id:number;

}

export interface curso{
cur_id:number,
cur_nombre:string,
asignatura:any,

}

export interface facultadeselement{

  fac_codigo: string;
  fac_nombre: string;
  ubicacion: any ;

}

@Component({
  selector: 'app-new-horario',
  templateUrl: './new-horario.component.html',
  styleUrls: ['./new-horario.component.css']
})
export class NewHorarioComponent implements OnInit {
 
 
  dias :String[]= ['lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

   horas:String[]= ['07:00:00','09:00:00','11:00:00','13:00:00','14:00:00','16:00:00','18:00:00','20:00:00','22:00:00'];
  public HorarioForm: FormGroup;
  estadoFormulario: string="";
  facultades: facultadeselement[]=[];
  recursos:Recurso[]=[];
  curso:curso[]=[];
  asignaturacurso:Asignaturacurso[]=[];
  tipoCursoHijos:curso[]=[];
  tipoRecursoHijos:Recurso[]=[];
  tipCursoAsigHijos:Asignaturacurso[]=[];
  

  constructor(
    private fb: FormBuilder,
    private tipoRecursoService: TipoRecursoService,
    private RecursosService: RecursoService,
    private facultadesService:FacultadService,
    private ubicacionesService:UbicacionService,
    private AsignaccionService: AsignaccionService,
    private HorarioService: HorarioService,
    private dialogRef: MatDialogRef<NewHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
      this.estadoFormulario="Agregar"
       this.HorarioForm=this.fb.group({

        facultad:['',Validators.required],
        rec_id:['', Validators.required],
        asignatura:[''],
        curso_id:['', Validators.required],
        dia:['', Validators.required],
        hinicio:['', Validators.required],
        hfin:['', Validators.required]



       })


  }

  ngOnInit(): void {
    this.getTipoFacultades();
  }

  getTipoFacultades() {
    this.facultadesService.getFacultades().subscribe((data: any) => {
      this.facultades = data.faculdatResponse.facultad;

    }, (error: any) => {
      console.log("Error consultar facultades ", error);
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

   cursos(id:string){

     //console.log("hujos"+id);
     this.HorarioService.getCursos(id)
     .subscribe((data: any) => {
     console.log("hijos: ",data);
    this.procesarCursos(data);
     })


   }

   procesarCursos(res: any){
    const dataTipocursosHijos : curso[] = [];
    if( res.metadata[0].code == "00") {
      let listHijos = res.cursoResponse.curso;
      listHijos.forEach((element : curso) => {
        
        dataTipocursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.tipoCursoHijos = dataTipocursosHijos;
    }
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

  cursosAsig(id:string){

    //console.log("hujos"+id);
    this.HorarioService.getCursosAsig(id)
    .subscribe((data: any) => {
    console.log("hijos: ",data);
   this.procesarCursosAsig(data);
    })


  }
  procesarCursosAsig(res: any){
    const dataTipocursosAsigHijos : Asignaturacurso[] = [];
    if( res.metadata[0].code == "00") {
      let listHijos = res.cursoResponse.cursoAsig;
      listHijos.forEach((element : Asignaturacurso) => {
        
        dataTipocursosAsigHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.tipCursoAsigHijos = dataTipocursosAsigHijos;
    }
  }

  onSave(){

    let data={
      rec_id: this.HorarioForm.get('rec_id')?.value,
      curso_id: this.HorarioForm.get('curso_id')?.value,
      dia: this.HorarioForm.get('dia')?.value,
      hinicio: this.HorarioForm.get('hinicio')?.value,
      hfin: this.HorarioForm.get('hfin')?.value


    }

    const uploadImageData= new FormData();
    uploadImageData.append('rec_id', data.rec_id);
    uploadImageData.append('curso_id', data.curso_id);
    uploadImageData.append('dia', data.dia);
    uploadImageData.append('hinicio', data.hinicio);
    uploadImageData.append('hfin', data.hfin);
    // llamanos al servicio guardar hprario

    this.HorarioService.saveHorario(uploadImageData).
        subscribe((data:any)=>{
            this.dialogRef.close(1);

        },(error:any)=>{
          this.dialogRef.close(2);

        })




  }
  onCancel() {
    this.dialogRef.close(3);
  }

}