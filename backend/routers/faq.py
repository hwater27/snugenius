# routers/faq.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import FAQ, MyQuestion
from schemas import FAQCreate
from datetime import datetime

router = APIRouter(prefix="/api/faq", tags=["faq"])


# 전체 FAQ 가져오기
@router.get("/all&{filterconditions}")
def get_all_faq(filterconditions: str, db: Session = Depends(get_db)):
    q = db.query(FAQ)

    if filterconditions != "none":
        q = q.filter(FAQ.category.contains(filterconditions))

    return q.order_by(FAQ.created_at.desc()).all()


# 특정 FAQ → 관련된 질문들 가져오기
@router.get("/{id}/questions")
def get_faq_related_questions(id: int, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == id).first()

    if not faq or faq.relevant_question is None:
        return []

    return db.query(MyQuestion).filter(MyQuestion.id == faq.relevant_question).all()


# 새 FAQ 등록
@router.post("/new")
def create_faq(payload: FAQCreate, db: Session = Depends(get_db)):
    faq = FAQ(**payload.dict())
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq


# FAQ 컨펌하기 (confirmed True)
@router.post("/{id}/confirm")
def confirm_faq(id: int, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == id).first()

    if faq:
        faq.confirmed = True
        faq.updated_at = datetime.utcnow()
        db.commit()

    return {"status": "confirmed"}


# FAQ 수정하여 등록(PATCH)
@router.patch("/{id}/new")
def update_faq(id: int, payload: FAQCreate, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == id).first()

    if not faq:
        return {"error": "FAQ not found"}

    update_data = payload.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(faq, key, value)

    faq.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(faq)

    return faq
