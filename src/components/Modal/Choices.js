import React from "react";
import styled from "styled-components";

const ChoiceWrap = styled.div`
  max-width: 500px;
  margin: 0 auto;
  column-count: 2;
  column-gap: 15px;
`;

const ChoiceRadio = styled.input`
  cursor: poiner;
  margin-tight: 5px;
`;

const ChoiceLabel = styled.label`
  cursor: pointer;
  display: block;
`;




export function Choices({ changeChoices, openItem, choice }) {
  return (
    <>
      <h3>Обиріть:</h3>
      <ChoiceWrap>
        {openItem.choices.map((item, i) => (
          <ChoiceLabel key={i}>
            <ChoiceRadio type='radio' name="choices" checked={choice === item} value={item} onChange={changeChoices} />
            {item}
          </ChoiceLabel>
        ))}
      </ChoiceWrap>

    </>
  )
}