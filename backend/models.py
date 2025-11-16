# models.py
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Enum
)
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # relationships
    majors = relationship("UserMajor", back_populates="user", cascade="all, delete-orphan")
    questions = relationship("Question", back_populates="user", cascade="all, delete-orphan")
    myquestions = relationship("MyQuestion", back_populates="user", cascade="all, delete-orphan")
    faqs_created = relationship("FAQ", back_populates="creator")


class UserMajor(Base):
    __tablename__ = "user_major"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    major_name = Column(String(255), nullable=False)
    student_number = Column(String(20), nullable=False)
    major_type = Column(
        Enum("주전공", "복수전공", "부전공", "심화전공", name="major_type_enum"),
        nullable=False
    )
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="majors")


class Requirement(Base):
    __tablename__ = "requirements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("Question", back_populates="relevant_requirement_obj")
    faqs = relationship("FAQ", back_populates="relevant_requirement_obj")


class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    type = Column(String(100))
    content = Column(Text)
    answer = Column(Text)
    relevant_requirement = Column(Integer, ForeignKey("requirements.id", ondelete="SET NULL"))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="questions")
    relevant_requirement_obj = relationship("Requirement", back_populates="questions")


class MyQuestion(Base):
    __tablename__ = "myquestion"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text)
    answer = Column(Text)
    status = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="myquestions")
    faqs = relationship(
        "FAQ",
        back_populates="relevant_question_obj",
        foreign_keys="FAQ.relevant_question"
    )


class FAQ(Base):
    __tablename__ = "faq"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(Text)
    category = Column(String(100))
    confirmed = Column(Boolean, default=False)
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    relevant_question = Column(Integer, ForeignKey("myquestion.id", ondelete="SET NULL"), nullable=True)
    relevant_requirement = Column(Integer, ForeignKey("requirements.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)

    creator = relationship("User", back_populates="faqs_created")
    relevant_question_obj = relationship("MyQuestion", back_populates="faqs")
    relevant_requirement_obj = relationship("Requirement", back_populates="faqs")
