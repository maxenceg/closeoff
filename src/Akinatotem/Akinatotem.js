import React from 'react';
import styled from 'styled-components';
import { AkinatotemGame } from './AkinatotemGame';

export const Akinatotem = () => {
    return (<div>
        <Title>AKINA<TitleHighlight>TOTEM</TitleHighlight></Title>
        <AkinatotemGame />
    </div>)
}

const Title = styled.span`
    font-size: 58px;
`;

const TitleHighlight = styled.span`
    color: #61dafb;
`;