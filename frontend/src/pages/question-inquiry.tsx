import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const backendURL = 'http://localhost:8000';

const Layout = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
`;

const LeftContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    background: white;
`;

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;
    background: white;
    // margin-left: calc(50vw - 600px);
`;

const ChatContainer = styled.div`
    width: 760px;
    min-height: calc(100vh - 60px);
    padding: 40px 0 120px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    background: white;
`;

const SidePanel = styled.div`
    flex: 0 0 auto;
    margin-left: 30px;
    width: 440px;
    position: relative;
    background: #fbfbff;
    border-left: 1px solid #dcdcdc;
    padding: 20px;
    overflow-y: auto;
    display: flex;
`;

const SidePanelContent = styled.div`
  width: 440px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PanelCard = styled.section`
    background: #ffffff;
    padding: 18px 20px;
    padding-top: 2px;
    border-radius: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const PanelTitle = styled.h4`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #333;
`;

const PanelText = styled.p`
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-line;
    color: #333;
`;

const PanelList = styled.ul`
    font-size: 13px;
    line-height: 1.6;
    padding-left: 18px;
    margin-top: 6px;
    color: #333;
`;

const PanelLink = styled.a`
    display: inline-block;
    margin-top: 6px;
    font-size: 12px;
    color: #4a5cff;
    text-decoration: underline;
    cursor: pointer;
`;

const MessageWrapper = styled.div<{ type: "user" | "bot" }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
`;

const MessageBox = styled.div<{ type: "user" | "bot" }>`
    max-width: 620px;
    padding: 15px 20px;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-line;
    align-self: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
    background-color: ${({ type }) =>
        type === "user" ? "#eeeeee" : "#ffeaea"};
    color: #333;
`;

const TagContainer = styled.div`
    display: flex;
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
    padding: 3px 8px;
    background-color: #f0f0f0;
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

const InputWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100vw);
    background-color: #f8f9ff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
`;

const InputContainer = styled.div`
    width: 1000px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
`;

const InputBox = styled.input`
    flex: 1;
    height: 45px;
    border-radius: 25px;
    border: none;
    padding: 0 20px;
    font-size: 14px;
    background-color: #e7e9ff;
    color: black;
    outline: none;
`;

const SendButton = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 45px;
    border-radius: 25px;
    border: none;
    background-color: #99a8ff;
    color: white;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
        background-color: #7c8cff;
    }
    &:active {
        transform: scale(0.9);
    }
`;

interface Message {
    type: "user" | "bot";
    text: string;
    tags?: string[];
    buttons?: { label: string; link: string }[];
}

export default function QuestionInquiry() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: `안녕하세요, OOO 님! 궁금한 내용이 있다면 저 스누지니어스에게 물어봐주세요!`,
      tags: [],
      buttons: [],
      // buttons: [{ label: "교과목 목록", link: "" }],
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

     try {
      const response = await axios.post(`${backendURL}/api/question/llm`, {
        user_id: 1,  // 변경 필요
        type: "inquiry",  // 변경 필요
        content: input,
        relevant_requirement: null,
      });

      const llmAnswer: string = response.data.llm_answer;

      const botMessage: Message = {
        type: "bot",
        text: llmAnswer,
        tags: response.data.tag == "answer" ? ["😊 질문이 해결되었어요.", "😅 답변이 만족스럽지 않아요.", "🤔 규정에 대한 논의가 필요해보여요. (직접 문의하기)"]
          : (response.data.tag == "obscure" ? ["✉️ 문의 메일 작성하기"] : []),
        buttons: response.data.requirement,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const botMessage: Message = {
        type: "bot",
        text: "답변을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    // setTimeout(() => {
    //   const botReply: Message = {
    //     type: "bot",
    //     text: `"${input}"에 대한 규정을 확인 중입니다.\n답변은 추후 제작 예정입니다.`,
    //   };
    //   setMessages((prev) => [...prev, botReply]);
    // }, 1000);
  };

  const clickTag = async (tag: string) => {
    if (tag == "✉️ 문의 메일 작성하기") {
      sendEmail();
    }
    // const userMessage: Message = { type: "user", text: tag };
    // setMessages((prev) => [...prev, userMessage]);
    // setInput("");

    //  try {
    //   const response = await axios.post(`${backendURL}/api/question/llm`, {
    //     user_id: 1,  // 변경 필요
    //     type: (tag == "✍️ 이수 규정 하나씩 점검하기") ? "checklist" : ((tag == "🏃‍♂️ 미이수 내용만 빠르게 확인하기") ? "quick" : "simulation"),
    //     content: tag,
    //     relevant_requirement: null,
    //   });

    //   const llmAnswer: string = response.data.llm_answer;

    //   const botMessage: Message = {
    //     type: "bot",
    //     text: llmAnswer,
    //   };

    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (error) {
    //   console.error(error);
    //   const botMessage: Message = {
    //     type: "bot",
    //     text: "답변을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    //   };
    //   setMessages((prev) => [...prev, botMessage]);
    // }
  };

  const sendEmail = () => {
    // messages 배열에서 Q/A 정리
    const formatted = `안녕하세요, 스누지니어스를 통해 아래 내용을 문의드립니다.

[스누지니어스 대화 내역]
` + messages
      .map((msg) => {
        const prefix = msg.type === "user" ? "A:\n" : "Q:\n";
        return `${prefix}${msg.text}`;
      })
      .join("\n\n");

    // mailto 링크 생성
    const subject = encodeURIComponent("[스누지니어스] 규정 문의 메일");
    const body = encodeURIComponent(formatted);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <Layout>
      <LeftContainer>
        <Container>
          <ChatContainer>
            {messages.map((msg, index) => (
              <MessageWrapper key={index} type={msg.type}>
                <MessageBox type={msg.type}>
                  {msg.text}
                  {msg.buttons?.map((btn, i) => (
                    <InlineButton key={i} href={btn.link} target="_blank">
                      {btn.label}
                    </InlineButton>
                  ))}
                </MessageBox>
                {msg.tags && msg.tags.length > 0 && (
                  <TagContainer>
                    {msg.tags.map((tag, i) => (
                      <Tag onClick={() => clickTag(tag)} key={i}>{tag}</Tag>
                    ))}
                  </TagContainer>
                )}
              </MessageWrapper>
            ))}
          </ChatContainer>
          <SidePanel>
            <SidePanelContent>
              <PanelCard>
                <PanelTitle>타전공 개설과목 대체 인정에 관한 시행세칙</PanelTitle>
                <PanelText>
                  제2조(정의) 타전공 개설과목은 자유전공학부 학생이 선택하여
                  승인받은 주전공, 부전공, 연합전공, 연계전공의 전공필수·전공선택
                  과목이 포함되지 않는 전공 교과목을 의미한다.
                </PanelText>
                <PanelLink href="#">자유전공학부 이수 규정 확인하기 ↗</PanelLink>
              </PanelCard>
            </SidePanelContent>
          </SidePanel>
        </Container>
      </LeftContainer>
      <InputWrapper>
        <InputContainer>
            <InputBox
              type="text"
              placeholder="질문 사항을 입력해 주세요."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend}>전송</SendButton>
        </InputContainer>
      </InputWrapper>
    </Layout>
  );
}