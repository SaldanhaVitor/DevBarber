import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const HeaderArea = styled.View`
    height: 50px;
    justify-content: center;
    padding: 60px 30px;
`;
export const HeaderTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
`;


export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
`;
export const ListArea = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const EmptyWarning = styled.Text`
    font-size:  16px;
    margin-top: 30px;
    text-align: center;
    color: #FFFFFF;
    font-weight: bold;
`;