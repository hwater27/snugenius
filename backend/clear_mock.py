from database import SessionLocal, engine, Base
from models import User, UserMajor, Requirement, Question, MyQuestion, FAQ

db = SessionLocal()

try:
    # 삭제 순서: FK 때문에 의존성이 있는 테이블 먼저 삭제
    db.query(FAQ).delete()
    db.query(MyQuestion).delete()
    db.query(Question).delete()
    db.query(UserMajor).delete()
    db.query(Requirement).delete()
    db.query(User).delete()
    db.commit()

    # AUTO_INCREMENT 초기화 (MySQL 기준)
    tables = ["users", "user_major", "requirements", "question", "myquestion", "faq"]
    for table in tables:
        db.execute(f"ALTER TABLE {table} AUTO_INCREMENT = 1")
    db.commit()

    print("*********** 모든 mock 데이터 삭제 및 AUTO_INCREMENT 초기화 완료")

finally:
    db.close()