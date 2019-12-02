# withrouter props and extends

- 아래와 같이 RouteComponentProps 를 extends 해서 그 외에 쓸 props 를 정의해주면 된다.
- https://github.com/DefinitelyTyped/DefinitelyTyped/issues/38271

```
import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { SearchIcon } from "./Icons";
import { Link, withRouter } from "react-router-dom";
import { RouteChildrenProps, RouteComponentProps } from "react-router";
import { WithProps } from "../styles/WithProps";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form<WithProps>`
  display: grid;
  grid-template-columns: 9fr 1fr;
  align-items: center;
  padding: 2px 1rem;
  width: ${props => props.widthProps}rem;
  height: ${props => props.heightProps}rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
`;

const Input = styled.input`
  background-color: initial;
  border: none;
  font-size: 1rem;
`;

const SLink = styled(Link)`
  text-align: end;
`;

interface Props extends RouteComponentProps {
  widthProps?: number;
  heightProps?: number;
}

function CustomSearchInput({
  history,
  widthProps,
  heightProps
}: RouteComponentProps & Props) {
  const [value, setValue] = useState("");
  // const [size, setSite] = useState(widthProps);
  console.log(history);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert(value);
    history.push(`/search/${value}`);
    setValue("");
  };

  return (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        widthProps={widthProps}
        heightProps={heightProps}
      >
        <Input placeholder="Search.." value={value} onChange={onChange} />
        {/* <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        > */}
        <SLink to={`/search/${value}`}>
          <SearchIcon />
        </SLink>
        {/* </IconButton> */}
      </Form>
    </Wrapper>
  );
}

export default withRouter(CustomSearchInput);
```
