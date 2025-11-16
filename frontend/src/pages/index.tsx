import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1000px;
  min-height: calc(100vh - 60px);
  margin-left: calc(50vw - 500px);
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #222;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

const Card = styled.div`
  background-color: #f8f9ff;
  border: 1px solid #d1d1d1;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background-color: #e1e4ff;
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: #99a8ff;
    border-radius: 6px;
    transition: width 0.3s ease;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

const SummaryBox = styled.div`
  margin-top: 40px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 16px;
  background-color: #f4f4ff;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
`;

const SummaryText = styled.p`
  font-size: 15px;
  color: #333;
  margin-bottom: 6px;
`;

export default function Main() {
  const [credits, setCredits] = useState({
    majorRequired: { taken: 24, required: 30 },
    majorElective: { taken: 18, required: 30 },
    liberal: { taken: 24, required: 36 },
    teacher: { taken: 10, required: 22 },
    general: { taken: 8, required: 15 },
  });

  const [majors, setMajors] = useState([
    { name: "컴퓨터공학부", taken: 36, required: 60 },
    { name: "자유전공학부", taken: 20, required: 45 },
  ]);

  const totalTaken = Object.values(credits).reduce(
    (sum, cur) => sum + cur.taken,
    0
  );
  const totalRequired = Object.values(credits).reduce(
    (sum, cur) => sum + cur.required,
    0
  );

  return (
    <Container>
      <SectionTitle>📊 수강 현황 대시보드</SectionTitle>

      <DashboardGrid>
        {Object.entries(credits).map(([key, value]) => {
          const labels: Record<string, string> = {
            majorRequired: "전공필수",
            majorElective: "전공선택",
            liberal: "교양",
            teacher: "교직",
            general: "일반선택",
          };
          const progress = Math.min(
            (value.taken / value.required) * 100,
            100
          ).toFixed(1);

          return (
            <Card key={key}>
              <CardTitle>{labels[key]}</CardTitle>
              <ProgressBar progress={Number(progress)} />
              <InfoText>
                {value.taken}학점 / {value.required}학점 이수 (
                {progress}%)
              </InfoText>
              <InfoText>
                남은 학점: {Math.max(value.required - value.taken, 0)}학점
              </InfoText>
            </Card>
          );
        })}
      </DashboardGrid>

      <SummaryBox>
        <SummaryTitle>🎓 전공별 이수 현황</SummaryTitle>
        {majors.map((m) => {
          const progress = Math.min((m.taken / m.required) * 100, 100).toFixed(
            1
          );
          return (
            <div key={m.name} style={{ marginBottom: "12px" }}>
              <strong>{m.name}</strong>
              <ProgressBar progress={Number(progress)} />
              <SummaryText>
                {m.taken}학점 / {m.required}학점 ({progress}%)
              </SummaryText>
              <SummaryText>
                남은 학점: {Math.max(m.required - m.taken, 0)}학점
              </SummaryText>
            </div>
          );
        })}
      </SummaryBox>

      <SummaryBox>
        <SummaryTitle>📅 졸업까지 남은 학점 요약</SummaryTitle>
        <SummaryText>현재 총 이수 학점: {totalTaken}학점</SummaryText>
        <SummaryText>졸업 요건: {totalRequired}학점</SummaryText>
        <SummaryText>
          남은 학점: {Math.max(totalRequired - totalTaken, 0)}학점
        </SummaryText>
      </SummaryBox>
    </Container>
  );
}
