from sqlalchemy import Boolean, Column, Integer, String, Text
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    completed = Column(Boolean, default=False)
    description = Column(Text, nullable=True)