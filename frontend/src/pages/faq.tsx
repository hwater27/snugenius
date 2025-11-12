import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 1000px;
    min-height: calc(100vh - 60px);
    margin-left: calc(50vw - 500px);
    padding: 40px 0;
`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
`;

const Select = styled.select`
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 30px;
    background-color: #D8E0FF;
    color: #333;
    font-size: 14px;
    cursor: pointer;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 11px 15px;
    margin-bottom: 1px;
    border: 1px solid #ccc;
    border-radius: 30px;
    color: #333;
    background-color: #D8E0FF;
    font-size: 14px;
`;

const SearchButton = styled.button`
    background-color: #99a8ff;
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease;
    &:hover {
        background-color: #7c8cff;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const FAQItem = styled.div`
    background-color: #eeeeee;
    padding: 20px;
    margin-bottom: 15px;
`;

const Question = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333;
`;

const Answer = styled.div`
    font-size: 14px;
    color: #333;
    margin-left: 15px;
    margin-bottom: 15px;
`;

const AnswerTag = styled.div`
    background-color: #ffeaea;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    line-height: 15px;
    position: relative;
    top: 1.5px;
    color: #fff;
    transition: all 0.1s ease-in-out;
`;

const TagContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
`;

const Tag = styled.button`
    background-color: #ffeaea;
    border: 1px solid #8F8F8F;
    border-radius: 20px;
    padding: 6px 15px;
    font-size: 12px;
    line-height: 15px;
    color: #333;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: #ffc5c5ff;
        color: #333;
        font-weight: 600;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const InlineButton = styled.a`
    display: inline-block;
    margin-left: 8px;
    position: relative;
    top: -1px;
    padding: 3px 8px;
    background-color: #FAFAFA;
    border-radius: 20px;
    font-size: 10px;
    color: #333;
    text-decoration: none;
    border: 1px solid #8F8F8F;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: #e0e0e0;
        color: #333;
        font-weight: 600;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  color: #333;
`;

const PopupBox = styled.div`
  background-color: #fff;
  width: 650px;
  height: 450px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 25px;
  border: none;
  background: none;
  font-size: 42px;
  cursor: pointer;
  color: #333;
`;

const PopupTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const PopupSectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const Box = styled.div`
  border: 1.5px solid #d1d1d1;
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 16px;
  background-color: #fff;
`;

const PopupQuestion = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const PopupAnswer = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const PopupQuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 14px;
    color: #333;
    margin-bottom: 6px;
  }
`;

interface FAQ {
  id: number;
  category: string;
  college: string;
  question: string;
  answer: string;
  tag: "행정실 답변" | "AI 답변";
  hasRegulationTag?: boolean;
}

const faqList: FAQ[] = [
  {
    id: 1,
    category: "전공 이수 규정",
    college: "인문대학/언어학과",
    question:
      "복수전공생 혹은 자유전공학부 주전공생도 ‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목을 이수해야 하나요?",
    answer: "‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목은 인문대학 소속 학생만 필수",
    tag: "행정실 답변",
  },
  {
    id: 2,
    category: "전공 이수 규정",
    college: "인문대학/언어학과",
    question:
      "복수전공생 혹은 자유전공학부 주전공생도 ‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목을 이수해야 하나요?",
    answer: "‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목은 인문대학 소속 학생만 필수",
    tag: "AI 답변",
    hasRegulationTag: true,
  },
  {
    id: 3,
    category: "전공 이수 규정",
    college: "인문대학/언어학과",
    question:
      "복수전공생 혹은 자유전공학부 주전공생도 ‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목을 이수해야 하나요?",
    answer: "‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목은 인문대학 소속 학생만 필수",
    tag: "행정실 답변",
  },
  {
    id: 4,
    category: "전공 이수 규정",
    college: "인문대학/언어학과",
    question:
      "복수전공생 혹은 자유전공학부 주전공생도 ‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목을 이수해야 하나요?",
    answer: "‘삶과 인문학’, ‘소그룹 고전원전읽기’ 과목은 인문대학 소속 학생만 필수",
    tag: "행정실 답변",
  },
];

export default function Faq() {
  const [selectedCategory, setSelectedCategory] = useState("전공 이수 규정");
  const [selectedCollege, setSelectedCollege] = useState("인문대학/언어학과");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const filteredFAQs = faqList.filter(
    (faq) =>
      faq.category === selectedCategory &&
      faq.college === selectedCollege &&
      faq.question.includes(searchKeyword)
  );

  return (
    <Container>
      <FilterContainer>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>전공 이수 규정</option>
          <option>교양 이수 규정</option>
          <option>졸업 요건</option>
        </Select>

        <Select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option>인문대학/언어학과</option>
          <option>사범대학/영어교육과</option>
          <option>자연과학대학/생명과학부</option>
          <option>공과대학/컴퓨터공학부</option>
        </Select>

        <SearchInput
          placeholder="검색어를 입력해 주세요."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchButton>검색</SearchButton>
      </FilterContainer>

      {filteredFAQs.map((faq) => (
        <FAQItem key={faq.id}>
          <Question>
            Q. {faq.question}
            <AnswerTag
              style={{
                backgroundColor:
                  faq.tag === "행정실 답변" ? "#0f0f70" : "#C84949",
                fontWeight: 600,
              }}
            >
              {faq.tag}
            </AnswerTag>
          </Question>
          <Answer>• {faq.answer} {faq.hasRegulationTag && <InlineButton>🔗 규정 확인</InlineButton>}</Answer>
          <TagContainer>
            <Tag
              onClick={() => {
                setSelectedFaq(faq);
                setShowPopup(true);
              }}
            >📚 질문 목록 확인하기</Tag>
          </TagContainer>
        </FAQItem>
      ))}

      {showPopup && selectedFaq && (
        <PopupOverlay>
          <PopupBox>
            <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
            <PopupSectionTitle>등록된 내용</PopupSectionTitle>
            <Box>
              <Question style={{marginBottom: "0", fontSize: "14px"}}>
                Q. {selectedFaq.question}
              </Question>
              <Answer style={{marginBottom: "0", fontSize: "14px"}}>• {selectedFaq.answer}</Answer>
            </Box>
            <PopupSectionTitle>다른 학생들이 남긴 질문</PopupSectionTitle>
            <Box>
              <PopupQuestionList>
                <li>질문1</li>
                <li>질문2</li>
                <li>질문3</li>
              </PopupQuestionList>
            </Box>
          </PopupBox>
        </PopupOverlay>
      )}
    </Container>
  );
}