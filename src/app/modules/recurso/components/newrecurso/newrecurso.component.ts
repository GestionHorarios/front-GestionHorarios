import { group } from '@angular/animations';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacultadService } from 'src/app/modules/shared/services/facultad.service';
import { RecursoService } from 'src/app/modules/shared/services/recurso.service';
import { TipoRecursoService } from 'src/app/modules/shared/services/tipo-recurso.service';
import { UbicacionService } from 'src/app/modules/shared/services/ubicacion.service';


export interface TipoRecurso {
  rectipo_codigo: string;
  rectipo_nombre: string;
  tiporecurso: any;
}

export interface facultadeselement{

  fac_codigo: string;
  fac_nombre: string;
  ubicacion: any ;

}

export interface ubicacioneselement{
  ubi_codigo:string,
  ubi_nombre:string,
  ubi_direccion:string,
  ubi_ciudad:string


}

@Component({
  selector: 'app-newrecurso',
  templateUrl: './newrecurso.component.html',
  styleUrls: ['./newrecurso.component.css']
})
export class NewrecursoComponent implements OnInit {

  public recursoForm: FormGroup;
  estadoFormulario: string = "";
  tipoRecursos: TipoRecurso[] = [];
  tipoRecursosPadres:TipoRecurso[]=[];
  tipoRecursoHijos:TipoRecurso[]=[];
  facultades: facultadeselement[]=[];
  ubicaciones:ubicacioneselement[]=[];
  constructor(
    private fb: FormBuilder,
    private tipoRecursoService: TipoRecursoService,
    private RecursoService: RecursoService,
    private facultadesService:FacultadService,
    private ubicacionesService:UbicacionService,
    private dialogRef: MatDialogRef<NewrecursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.estadoFormulario = "Agregar";

    this.recursoForm = this.fb.group({
      rec_codigo:['',Validators.required],
      tiporecurso: ['',Validators.required],
      rectipo_padre: ['',Validators.required],
      facultad: ['',Validators.required],
      rec_capmax: [''],
      rec_nombre: ['',Validators.required],
      rec_decripcion: ['',Validators.required],
      ubicacion: ['',Validators.required]

     
    })

    if(data !=null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";

    }

  }

 

  ngOnInit(): void {
    this.getTipoRecursos();
    this.getTipoFacultades();
    this.getTipoubicaciones();
  }

  onSave() {
    let data={
      //rec_id: this.recursoForm.get('rec_id')?.value,
      rec_codigo: this.recursoForm.get('rec_codigo')?.value,
      tiporecurso: this.recursoForm.get('tiporecurso')?.value,
      rectipo_padre: this.recursoForm.get('rectipo_padre')?.value,
      facultad: this.recursoForm.get('facultad')?.value,
      rec_capmax: this.recursoForm.get('rec_capmax')?.value,
      rec_nombre: this.recursoForm.get('rec_nombre')?.value,
      rec_decripcion: this.recursoForm.get('rec_decripcion')?.value,
      ubicacion: this.recursoForm.get('ubicacion')?.value

    }
    const uploadImageData = new FormData();
    //uploadImageData.append('rec_id', data.rec_id);

    uploadImageData.append('rec_codigo', data.rec_codigo);
    uploadImageData.append('rectipo_codigo', data.tiporecurso);
    uploadImageData.append('fac_codigo', data.facultad);
    uploadImageData.append('rec_capmax', data.rec_capmax);
    uploadImageData.append('rec_nombre', data.rec_nombre);
    uploadImageData.append('rec_decripcion', data.rec_decripcion);
    uploadImageData.append('ubi_codigo', data.ubicacion); 
    
    if(this.data !=null){
      //actualizar recurso

      this.RecursoService.updateRecursos(uploadImageData, this.data.rec_id)
       .subscribe( (data: any )=>{
          this.dialogRef.close(1);
    
        },(error:any)=>{
          this.dialogRef.close(2);
          console.log("error al editar ",error);
        })
    
    }else{
    // llamamos al servicio guardar 

    this.RecursoService.saveRecursos(uploadImageData)
      .subscribe((data:any)=>{
        this.dialogRef.close(1);

      },(error:any)=>{
        this.dialogRef.close(2);
        console.log("error al guardar",error);
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

  getTipoFacultades() {
    this.facultadesService.getFacultades().subscribe((data: any) => {
      this.facultades = data.faculdatResponse.facultad;

    }, (error: any) => {
      console.log("Error consultar facultades ", error);
    })
  }

  getTipoubicaciones() {

    this.ubicacionesService.getUbicaciones().subscribe((data: any) => {
      
      this.ubicaciones=data.ubicacionResponse.ubicacion;

    }, (error: any) => {
      console.log("Error consultar Ubicaciones ", error);
    })
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

  updateForm(data: any) {

    this.recursoForm = this.fb.group({
      rec_codigo:[data.rec_codigo, Validators.required],
      tiporecurso: [data.tiporecurso.rec_codigo, Validators.required],
      rectipo_padre: ['', Validators.required],
      facultad: [data.facultad.fac_codigo, Validators.required],
      rec_capmax: [data.rec_capmax],
      rec_nombre: [data.rec_nombre, Validators.required],
      rec_decripcion: [data.rec_descripcion, Validators.required],
      ubicacion: [data.ubicacion.ubi_codigo, Validators.required]
    })
  }
  
 
}
