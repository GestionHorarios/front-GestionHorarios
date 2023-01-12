import { Component, OnInit } from '@angular/core';
import { ArchivoService } from 'src/app/modules/shared/services/archivo.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css'],
})
export class ArchivoComponent implements OnInit {
  constructor(private archivoService: ArchivoService) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    console.log(event);
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.archivoService.savedocument(formData).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  submitForm() {
    console.log('submit');
  }
}
