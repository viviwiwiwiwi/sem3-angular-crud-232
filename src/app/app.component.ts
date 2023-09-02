import { Component } from '@angular/core';
import { Contacto } from './modelos/contact';
import { FormBuilder, Validator, FormGroup } from '@angular/forms';
import { ContactoService } from './servicios/contacto.service';
import Swal, { SweetAlertArrayOptions }  from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-232';
  contactoArray: Contacto[ ]=[ ];
  contactoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactoService: ContactoService){
    this.contactoForm=formBuilder.group({
      fullname: [''],
      phone: [''],
      email: [''],

    })
  }

  ngOnInit(): void{
    this.getContactos();

  }

  getContactos(): void {
      this.contactoService.getContactos().subscribe(
      (result:any)=>{
      this.contactoArray=result?.contactos;
      console.log(this.contactoArray);

    },
    (err: any)=>{
      Swal.close();
      Swal.fire({
        icon:'error',
        title:'Advertencia . . .',
        text: 'Ha ocurrido un error',
      });
    }
  );
}


registrarContacto(): void{
this.contactoService.registrarContacto(this.contactoForm.value).subscribe(
  (result:any)=>{

  },(err:any)=>{
    Swal.close();
    Swal.fire({
      icon:'error',
      title:'Advertencia . . .',
      text: 'Ha ocurrido un error al registrar!',
    });
  });
  console.log('Llamando a getcontactos');
  this.getContactos();

}
}
