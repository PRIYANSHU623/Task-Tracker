from fastapi import FastAPI
from pydantic import BaseModel
from database import engine, SessionLocal
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class TaskCreate(BaseModel):
    title :str


@app.post("/tasks")
def create_task(task: TaskCreate):
    
    db=SessionLocal()
    
    new_task = models.Task(title=task.title)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@app.get("/tasks")
def get_tasks():
    db = SessionLocal()
    tasks = db.query(models.Task).all()
    return tasks

@app.put("/tasks/{task_id}")
def complete_task(task_id: int):

    db = SessionLocal()

    task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    task.completed = True

    db.commit()

    return {"message": "Task completed"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    
    db = SessionLocal()
    
    task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()
    
    db.delete(task)
    
    db.commit()
    return {"message": "Task deleted"}
    