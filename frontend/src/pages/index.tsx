import styled from "styled-components";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 80px);
    margin-left: calc(50vw - 600px);
`;

const Text1 = styled.div`
    position: relative;
    top: 0px;
    left: 0px;
    color: black;
    font-size: 22px;
    font-weight: 300;
    line-height: 40px;
`;

export default function Main() {
    return (
      <Container>
        <Text1>본문 내용입니다.</Text1>
      </Container>
    );
}