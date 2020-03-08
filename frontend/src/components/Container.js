import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  & + div {
    margin-top: 20px;
  }

  header {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: start;
    }

    a {
      font-size: 13px;
      text-decoration: none;
      color: #090909;
      margin-right: 6px;
      padding: 8px;
      border: 0;
      border-radius: 4px;
      background: #ffd700;

      &:hover {
        background: #fbec5d;
      }
    }
  }
`;

export default Container;
