import { Component,OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { __values } from 'tslib';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  displayedColumns: String[] = ['productName', 'Category', 'Date','Quality', 'Price','Comment','Actions'];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api: ApiService){
    
  
  }
  editProduct(row :any){
    this.dialog.open(DialogComponent, {
      width:'30%',
        data:row,
    }).afterClosed().subscribe(val=>{this.getAllProducts()})
  }
  deleteProduct(id :number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product deleted successfully");
      },
      error:()=>{alert("Error Occured");

      }
    }
    )
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%',
  
    }).afterClosed().subscribe(val=>{this.getAllProducts()})
  }
ngOnInit(): void {
  this.getAllProducts();
}
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        console.warn(err);
      }
    }) }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

