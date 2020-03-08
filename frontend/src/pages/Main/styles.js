import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
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

    select {
      border: 1px solid #eee;
      border-radius: 5px;
      height: 30px;
    }
  }
`;

export const ButtonFiltrar = styled.div`
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

export const DivList = styled.div`
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px 15px;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    flex: 1;
    padding: 15px 10px;
    list-style: none;
    font-size: 16px;
    border-bottom: 1px solid #eee;

    svg {
      width: 40px;
      color: #666;
    }
  }
`;
