from fastapi import FastAPI
from pydantic import BaseModel
from database import engine, SessionLocal
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://task-tracker-umber-seven.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class TaskCreate(BaseModel):
    title :str


@app.post("/tasks")
def create_task(task: TaskCreate):

    db = SessionLocal()

    try:

        new_task = models.Task(
            title=task.title
        )

        db.add(new_task)

        db.commit()

        db.refresh(new_task)

        return new_task

    finally:
        db.close()

@app.get("/tasks")
def get_tasks():

    db = SessionLocal()

    try:
        tasks = db.query(models.Task).all()
        return tasks

    finally:
        db.close()


@app.put("/tasks/{task_id}")
def complete_task(task_id: int):

    db = SessionLocal()

    try:

        task = db.query(models.Task).filter(
            models.Task.id == task_id
        ).first()

        task.completed = True

        db.commit()

        return {"message": "Task completed"}

    finally:
        db.close()


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    try:

        task = db.query(models.Task).filter(
            models.Task.id == task_id
        ).first()

        db.delete(task)

        db.commit()

        return {"message": "Deleted"}

    finally:
        db.close()