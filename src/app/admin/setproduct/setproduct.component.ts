import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../../services/backend.service';



@Component({
  selector: 'setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {

  toggleField: string;
  dataSource: MatTableDataSource<any>;
  members: any[];
  myDocData: any;

  savedChanges = false;
    error: boolean = false;
    errorMessage: String = '';
    dataLoading: boolean = false;
    private querySubscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];


  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.toggleField = 'searchMode';
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle(filter?) {
    if (!filter) { filter = 'searchMode'
  } else { filter = filter; }
    this.toggleField = filter;
  }

  getData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getDocs('product')
        .subscribe(res => {
          this.members = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLoading = false;
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => { this.error = false; this.dataLoading = false; });
  }
  getFilterData(filters) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getFilterProducts('product', filters)
        .subscribe(members => {
          this.members = members;
          this.dataSource = new MatTableDataSource(members);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLoading = false;
        },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => { this.error = false; this.dataLoading = false; });
  }
  setData(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.setDocs('product', formData)
        .then((res) => {
            this.savedChanges = true;
            this.dataLoading = false;
        }).catch(error => {
          this.error = true;
          console.log(error.message);
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
  }

  updateData(formData) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.updateDocs('product', formData)
        .then((res) => {
            this.savedChanges = true;
            this.dataLoading = false;
          }).catch(error => {
            this.error = true;
            console.log(error.message);
            this.errorMessage = error.message;
            this.dataLoading = false;
          });
      }
getDoc(docId) {
  this.dataLoading = true;
  this.querySubscription = this._backendService.getOneDoc('product', docId)
      .subscribe(res => {
        if (res) {
          this.myDocData = res;
          this.toggle('editMode');
          this.dataLoading = false;
        }
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => { this.error = false; this.dataLoading = false; });
}

// 

// deleteDoc(docId) {
//   if (confirm('Are you sure you wish to delete this?')) {
//   this.dataLoading = true;
//   this.querySubscription = this._backendService.delOneDoc('product', docId)
//       .subscribe(res => {
//         if (res) {
//           this.toggle('searchMode');
//           this.dataLoading = false;

//         }
//       },
//       (error) => {
//         this.error = true;
//         this.errorMessage = error.message;
//         this.dataLoading = false;
//       },
//       () => { this.error = false; this.dataLoading = false; });
//     }
// }

deleteDoc(docId) {
  if (confirm("Are you sure want to delete this record?")) {
      this.dataLoading = true;
      this._backendService.delOneDoc('product', docId).then((res) => {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.toggle('searchMode');
      }).catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }
}
  // function for data table -results view
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
