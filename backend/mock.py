from database import SessionLocal, engine, Base
from models import User, UserMajor, Requirement, Question, MyQuestion, FAQ
from datetime import datetime

# 테이블 생성
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # ===== Users =====
    user1 = User(role="student")
    user2 = User(role="office")
    db.add_all([user1, user2])
    db.commit()

    # ===== UserMajor =====
    major1 = UserMajor(user_id=user1.id, major_name="컴퓨터공학", student_number="20231234", major_type="주전공")
    major2 = UserMajor(user_id=user2.id, major_name="영어영문학", student_number="20235678", major_type="부전공")
    db.add_all([major1, major2])
    db.commit()

    # ===== Requirements =====
    req1 = Requirement(title="자료구조", description="기초 자료구조 과목", category="전공")
    req2 = Requirement(title="영어회화", description="영어 실습", category="교양")
    db.add_all([req1, req2])
    db.commit()

    # ===== Questions =====
    q1 = Question(user_id=user1.id, type="general", content="자료구조 질문1", answer="답변1", relevant_requirement=req1.id)
    q2 = Question(user_id=user2.id, type="general", content="영어회화 질문2", answer="답변2", relevant_requirement=req2.id)
    db.add_all([q1, q2])
    db.commit()

    # ===== MyQuestions =====
    mq1 = MyQuestion(user_id=user1.id, question="내 질문 1", answer="내 답변 1", status="open")
    mq2 = MyQuestion(user_id=user2.id, question="내 질문 2", answer="내 답변 2", status="closed")
    db.add_all([mq1, mq2])
    db.commit()

    # ===== FAQ =====
    faq1 = FAQ(
        question="FAQ 질문 1",
        answer="FAQ 답변 1",
        category="전공",
        confirmed=True,
        created_by=user1.id,
        relevant_question=mq1.id,
        relevant_requirement=req1.id
    )
    faq2 = FAQ(
        question="FAQ 질문 2",
        answer="FAQ 답변 2",
        category="교양",
        confirmed=False,
        created_by=user2.id,
        relevant_question=mq2.id,
        relevant_requirement=req2.id
    )
    db.add_all([faq1, faq2])
    db.commit()

    print("*********** Mock 데이터 삽입 완료")

finally:
    db.close()
