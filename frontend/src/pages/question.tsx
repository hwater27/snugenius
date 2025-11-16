import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 60px);
    margin-left: calc(50vw - 600px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 60px;
`;

const Title = styled.h2`
    font-size: 22px;
    font-weight: 500;
    color: #000;
    margin-bottom: 60px;
`;

const CardWrapper = styled.div`
    display: flex;
    gap: 60px;
`;

const Card = styled.div`
    width: 320px;
    height: 200px;
    background: linear-gradient(180deg, #e8ecff 0%, #f3f6ff 100%);
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 40px 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.12);
    }
`;

const CardTitle = styled.h3`
    padding-top: 10px;
    font-size: 22px;
    font-weight: 700;
    color: #000;
    margin: 0;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #bfc7ef;
    margin: 20px 0;
`;

const Description = styled.div`
    font-size: 16px;
    color: #333;
    line-height: 2;
`;

const Arrow = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    align-self: flex-end;
    position: relative;
    top: -165px;
`;

export default function QuestionProgress() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Title>질문 유형을 선택해 주세요.</Title>
      <CardWrapper>
        <Card onClick={() => navigate("/question/inquiry")}>
          <div>
            <CardTitle>규정 확인 · 문의</CardTitle>
            <Divider />
            <Description>
              규정 내용 질의응답/검색 <br />
              문의 메일 자동 작성/전달
            </Description>
          </div>
          <Arrow>›</Arrow>
        </Card>

        <Card onClick={() => navigate("/question/progress")}>
          <div>
            <CardTitle>이수 현황 · 수강 계획</CardTitle>
            <Divider />
            <Description>
              이수 현황 점검 (졸업 시뮬레이션) <br />
              수강 계획 추천/지도
            </Description>
          </div>
          <Arrow>›</Arrow>
        </Card>
      </CardWrapper>
    </Container>
  );
}