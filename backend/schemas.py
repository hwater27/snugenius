# schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# --------------------------
# User
# --------------------------
class UserCreate(BaseModel):
    role: str


class UserOut(BaseModel):
    id: int
    role: str
    created_at: datetime

    class Config:
        orm_mode = True


# --------------------------
# UserMajor
# --------------------------
class UserMajorCreate(BaseModel):
    user_id: int
    major_name: str
    student_number: str
    major_type: str  # ENUM → 그냥 string


class UserMajorOut(UserMajorCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# --------------------------
# Requirements
# --------------------------
class RequirementCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None


class RequirementOut(RequirementCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# --------------------------
# Question
# --------------------------
class QuestionCreate(BaseModel):
    user_id: int
    type: Optional[str] = None
    content: Optional[str] = None
    relevant_requirement: Optional[int] = None


class QuestionOut(BaseModel):
    id: int
    user_id: int
    type: Optional[str]
    content: Optional[str]
    answer: Optional[str]
    relevant_requirement: Optional[int]
    created_at: datetime

    class Config:
        orm_mode = True


# --------------------------
# MyQuestion
# --------------------------
class MyQuestionCreate(BaseModel):
    user_id: int
    question: Optional[str] = None
    answer: Optional[str] = None
    status: Optional[str] = None


class MyQuestionOut(BaseModel):
    id: int
    user_id: int
    question: Optional[str]
    answer: Optional[str]
    status: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


# --------------------------
# FAQ
# --------------------------
class FAQCreate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    confirmed: Optional[bool] = False
    created_by: Optional[int] = None
    relevant_question: Optional[int] = None
    relevant_requirement: Optional[int] = None


class FAQOut(FAQCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
