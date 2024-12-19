import { Component, OnInit} from '@angular/core';
import { TaskServicioService } from './Servicio/task-servicio.service';
import Task from "./Interface/Task";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppToDo';

 
  constructor(private taskService: TaskServicioService) {}

  errorMessage: string = '';

  Tasks: Task[]=[];

 
  newTask: Task = {
    id: 0,
    nombre: '', 
    fechaInicio: '',
    estatus: 'Pendiente'
  };


 

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.GetAllTasks().subscribe(
      (data) => (this.Tasks = data),
      (error) => console.error('Error al cargar tareas:', error)
    );
  }

  PostTask() {
     // Limpiar mensaje de error previo
     this.errorMessage = '';

    if (this.newTask.nombre.trim() && this.newTask.fechaInicio.trim()) {
      // Ajustar el formato de fechaInicio antes de enviarlo al backend
      this.newTask.fechaInicio = new Date(this.newTask.fechaInicio).toISOString().split('T')[0];
  
      this.taskService.PostTask(this.newTask).subscribe(
        (task) => {
       this.Tasks.push(task); // Agregar la nueva tarea a la lista de tareas
       this.newTask = { id: 0, nombre: '', fechaInicio: '', estatus: 'Pendiente' }; // Reinicia el formulario
      },
   (error) => {
          console.error('Error al agregar la tarea:', error);
    }
    );
    } else {
      this.errorMessage='El nombre y la fecha son obligatorios.';
    }
  }
  



  DeleteTask(id: number) {
    this.taskService.DeleteTask(id).subscribe(
      (data) => (this.Tasks = data),
      (error) => console.error('Error al eliminar la tarea:', error)
    );
  }
  
  PutTask(task: Task) {
    task.estatus = task.estatus === 'Pendiente' ? 'Completada' : 'Pendiente';
    this.taskService.PutTask(task, task.id).subscribe(
      (data) => (this.Tasks = data),
      (error) => console.error('Error al actualizar la tarea:', error)
    );
  }
}
