# routers/question.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Question, MyQuestion
from schemas import QuestionCreate
from utils.llm import ask_llm
from utils.email import send_email
from utils.recommendation import generate_recommendation
from datetime import datetime

router = APIRouter(prefix="/api/question", tags=["question"])


# LLM 답변 받기
@router.post("/llm")
def ask_question(payload: QuestionCreate, db: Session = Depends(get_db)):
    answer = ask_llm(payload.type, payload.content)

    new_q = Question(
        user_id=payload.user_id,
        type=payload.type,
        content=payload.content,
        answer=answer["answer"],
        relevant_requirement=payload.relevant_requirement
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)

    return {"question": new_q, "llm_answer": answer["answer"], "tag": answer["tag"], "requirement": answer["requirement"]}


# 추천 받기
@router.get("/recommendation")
def get_recommendation(user_id: int, db: Session = Depends(get_db)):
    result = generate_recommendation(user_id, db)
    return {"recommendation": result}


# 이메일 전송
@router.post("/email")
def send_question_email(to_email: str, subject: str, body: str):
    send_email(to_email, subject, body)
    return {"status": "sent"}
