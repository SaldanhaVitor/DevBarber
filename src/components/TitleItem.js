import React from 'react';
import styled from 'styled-components/native';

const PageTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
`;

export default ({page}) => {

    return (
        <PageTitle>{page}</PageTitle>
    );
}