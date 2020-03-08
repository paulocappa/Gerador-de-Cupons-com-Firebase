import styled, { css } from "styled-components";

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px 15px;

  div {
    display: flex;
    flex-direction: column;
    flex: 1;

    & + div {
      margin-left: 20px;
    }

    span {
      font-size: 16px;
      margin-bottom: 10px;
    }

    select,
    input {
      border: 1px solid #eee;
      border-radius: 5px;
      padding-left: 5px;
      height: 30px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 7px;

  button {
    margin-right: 15px;
    padding: 8px;
    border: 0;
    border-radius: 4px;
    background: #dcdcdc;

    ${props =>
      props.loading &&
      css`
        opacity: 0.5;
        cursor: not-allowed;
      `}

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const MsgError = styled.span`
  color: red;
  margin-right: 15px;
  margin-top: 5px;
`;

export const MsgSuccess = styled.span`
  color: green;
  margin-right: 15px;
  margin-top: 5px;
`;
