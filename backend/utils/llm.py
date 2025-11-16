"""
  [Input]
  1) type
    - 'inquiry' : 
    - 'progress' : 졸업 시뮬레이션
    - 'checklist' : 이수 규정 하나씩 점검하기
    - 'quick' : 미이수 내용만 빠르게 확인하기
  2) content : 질문 내용

  [Output]
  1) answer : 답변 내용
  2) tag : 태그
    - 'answer' : 답변
    - 'obscure' : 답변 불가, 문의 메일 작성
    - 'recommendation' : 수강 계획 추천 받기
  3) requirement : 관련 규정 (id)
"""

def ask_llm(type: str, content: str) -> str:
    return {
        "answer": f"""질문 유형 : {type} / 질문한 내용 : {content}
AI가 답변을 생성하여 전달해줍니다.""",
        "tag": "answer" if content == "답변" else ("obscure" if content == "답변 불가" else None),
        "requirement": 1 if content == "규정" else None,
    }