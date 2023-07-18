import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
QualityList=["Brand New","Second Hand","Refurbished"];
ProductForm!:FormGroup;
Actionbtn : string='Save';
constructor(private formBuilder: FormBuilder,
  private api: ApiService,
  @Inject (MAT_DIALOG_DATA) public editData :any,
  private dialogRef: DialogRef<DialogComponent>){}
ngOnInit(): void {
  this.ProductForm=this.formBuilder.group({
 productName : ['',Validators.required],
 category:['',Validators.required],
 Quality:['',Validators.required],
Price:['',Validators.required],
Comment:['',Validators.required],
Date:['',Validators.required],
  })
  if(this.editData){
    this.Actionbtn="Update";
    this.ProductForm.controls['productName'].setValue(this.editData.productName);
    this.ProductForm.controls['category'].setValue(this.editData.category);
    this.ProductForm.controls['Quality'].setValue(this.editData.Quality);
    this.ProductForm.controls['Price'].setValue(this.editData.Price);
    this.ProductForm.controls['Comment'].setValue(this.editData.Comment);
    this.ProductForm.controls['Date'].setValue(this.editData.Date);
  }
}
addProduct(){
if(!this.editData){
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
}else{
  this.updateProduct();
}
}
updateProduct()
{
this.api.putProduct(this.ProductForm.value,this.editData.id).subscribe({
  next:(res)=>{
    alert("Product Updated Successfully");
    this.ProductForm.reset();
    this.dialogRef.close();
  },
  error:()=>{
    alert("Error Occured");
  }
})
}
}
