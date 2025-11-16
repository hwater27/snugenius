# routers/requirements.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Requirement
from schemas import RequirementOut

router = APIRouter(prefix="/api/requirements", tags=["requirements"])


# 개별 규정 가져오기
@router.get("/{id}", response_model=RequirementOut)
def get_requirement(id: int, db: Session = Depends(get_db)):
    req = db.query(Requirement).filter(Requirement.id == id).first()
    return req


# 전체 규정 가져오기 (필터 추가 가능)
@router.get("/all&{filterconditions}")
def get_all_requirements(filterconditions: str, db: Session = Depends(get_db)):
    q = db.query(Requirement)

    # 예: "언어학" 같은 category-filter 지원
    if filterconditions != "none":
        q = q.filter(Requirement.category.contains(filterconditions))

    return q.order_by(Requirement.created_at.desc()).all()