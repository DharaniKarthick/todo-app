import { Component,OnInit,ViewChild } from '@angular/core';
import {Todo} from '../../todo';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string='';
  tasks!: Todo[];
  newTask=  {itemName:'',itemDescription:'',itemStatus:false};
  selectedTask:any={};
  emptyTodo: Todo = {
    itemName: '',
    itemDescription: '',
    itemId: 0,
    itemStatus: false
  };
  @ViewChild('title') title: any;
  @ViewChild('desc') Desc:any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.loadTasks();
    });
  }

  loadTasks() {
    // Make an authenticated request to retrieve tasks using the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any>('https://todoapplication20231102110016.azurewebsites.net/api/ToDoItems', { headers }).subscribe((response: any) => {
      // Handle the response, which should be a list of tasks
      this.tasks = response;
    });
  }

  createTask(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post<any>('https://todoapplication20231102110016.azurewebsites.net/api/ToDoItems',this.newTask, { headers }).subscribe((response: any) => {
      // Handle the response, which should be a list of tasks
      this.tasks = response;

    // Clear the input field
    this.title.nativeElement.value = '';
    this.Desc.nativeElement.value='';
      //this.tasks.push(response);
      this.loadTasks();
    });

  }

  toggleTask(task: Todo) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.put<any>('https://todoapplication20231102110016.azurewebsites.net/api/ToDoItems/'+task.itemId,task, { headers }).subscribe((response: any) => {
      // Handle the response, which should be a list of tasks
      this.loadTasks();
  });
  }

  updateTask(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any>('https://todoapplication20231102110016.azurewebsites.net/api/ToDoItems', { headers }).subscribe((response: any) => {
      // Handle the response, which should be a list of tasks
      this.loadTasks();
      this.selectedTask = this.emptyTodo ;

    });
  }

  deleteTask(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete<any>('https://todoapplication20231102110016.azurewebsites.net/api/ToDoItems/' + id, { headers }).subscribe(
      (response: any) => {
        // Handle the response, if needed
        // For example, you can check for a success message or status in the response
        console.log('Delete response:', response); // Add this line for debugging
        this.tasks = response;
        this.loadTasks();
        // Call loadTasks to refresh the task list after a successful delete
        //this.loadTasks();
      },
      (error: any) => {
        // Handle the error, if needed
        console.error('Error deleting task:', error);
      }
    );
  }

}
