import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
QualityList=["Brand New","Second Hand","Refurbished"];
ProductForm!:FormGroup;
constructor(private formBuilder: FormBuilder,private api: ApiService,private dialogRef: DialogRef<DialogComponent>){}
ngOnInit(): void {
  this.ProductForm=this.formBuilder.group({
 productName : ['',Validators.required],
 category:['',Validators.required],
 Quality:['',Validators.required],
Price:['',Validators.required],
Comment:['',Validators.required],
Date:['',Validators.required],
  })
}
addProduct(){
if(this.ProductForm.valid){
  this.api.postProduct(this.ProductForm.value)
  .subscribe({
    next:(res)=>{alert("Product Added Succesfully");
  this.ProductForm.reset();
  this.dialogRef.close();
  },
    error:()=>{alert("Error Occured")}
  })
}
}
}
