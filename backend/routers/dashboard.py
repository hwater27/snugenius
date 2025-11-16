# routers/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import sys
from database import get_db
from models import FAQ, MyQuestion
from sqlalchemy import desc

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


# 학생 → FAQ: 가장 많이 질문된 FAQ 가져오기
@router.get("/student/faq")
def get_top_faq(db: Session = Depends(get_db)):
    # 예: confirmed FAQ 기준으로 최근 생성된 FAQ 상위 10개
    faqs = db.query(FAQ).filter(FAQ.confirmed == True).order_by(desc(FAQ.created_at)).limit(10).all()
    return faqs


# 학생 → MyQuestion: 내가 질문한 목록
@router.get("/student/myquestion")
def get_student_myquestions(user_id: int, db: Session = Depends(get_db)):
    myq = db.query(MyQuestion).filter(MyQuestion.user_id == user_id).order_by(desc(MyQuestion.created_at)).all()
    return myq


# 사무실/교직원 → FAQ 전체 보기
@router.get("/office/faq")
def get_office_faq(db: Session = Depends(get_db)):
    faqs = db.query(FAQ).order_by(desc(FAQ.created_at)).all()
    return faqs


# 사무실/교직원 → MyQuestion 전체 보기
@router.get("/office/myquestion")
def get_office_myquestions(db: Session = Depends(get_db)):
    myq = db.query(MyQuestion).order_by(desc(MyQuestion.created_at)).all()
    return myq
