import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RefreshControl } from 'react-native';

import { Container } from './styles';
import { UserContext } from '../../contexts/UserContext'

import Api from '../../Api';

const Area = styled.View`
    background-color: #FFFFFF;
    min-height: 770px;
`;
const FloatArea = styled.View`
    background-color: #FFF;
    min-height: 150px;
    border-radius: 20;
    border-color: #ddd;
    border-bottom-width: 6;
    shadow-color: #000;
    shadow-offset: {width: 0, height: 5};
    shadow-opacity: 0.5;
    shadow-radius: 2;
    elevation: 1;
    margin-left: 20;
    margin-right: 20;
    margin-top: -70;
`;
const ExitButton = styled.TouchableOpacity`
    margin-top: 50px;
    height: 60px;
    width: 170px;
    justify-content: center;
    margin-left: 108px;
    align-items: center;
    border-radius: 10px;
    background-color: #4EADBE;
`;

const ExitButtonText = styled.Text`
    color: #FFF;
    padding: 10px 15px;
    font-size: 20px;
    font-weight: bold;
`;

const AvatarIcon = styled.Image`
    width: 100px;
    height: 130px;
    border-radius: 20px;
`;

const UserImage = styled.View`
    margin-top: -50px;
`;

const UserName = styled.Text`
    color: #006f80;
    margin-top: -80px;
    margin-left: 110px;
    font-size: 30px;
    font-weight: bold;
`;
const UserEmail = styled.Text`
    color: #8c8e8f;
    margin-top: -5px;
    margin-left: 110px;
    font-size: 18px;
`;
const UserAppointments = styled.Text`
    color: #006f80;
    margin-top: -1px;
    margin-left: 110px;
    font-size: 30px;
    font-weight: bold;
`;
const UserAppointmentsText = styled.Text`
    color: #8c8e8f;
    margin-left: 110px;
    font-size: 18px;
`;
const UserAvalicao = styled.Text`
    color: #006f80;
    margin-top: -64px;
    margin-left: 240px;
    font-size: 30px;
    font-weight: bold;
`;
const UserAvalicaoText = styled.Text`
    color: #8c8e8f;
    margin-left: 240px;
    font-size: 18px;
`;

const CapaIcon = styled.Image`
    width: 100%;
    height: 440px;
`;

const Scroller = styled.ScrollView`
   flex: 1;
`;

export default () => {
    const { state: user } = useContext(UserContext);

    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setLoading(true);
        let res = await Api.getUser();
        res.data.capa = 'https://upload-example-saldanhavitor.s3.amazonaws.com/dbac345a7940f5471547186ce22cbf51-barber.jpg';
        res.data.avaliacao = await defineAvaliacao(res);
        await setUserData(res.data);
        setLoading(false);
    }

    const defineAvaliacao = (res) => {
        if (!res.data.appointments < 1) {
            let avaliacaoAtual = ((Math.floor(Math.random() * (10 - 1)) + 1 + Math.floor(Math.random() * (10 - 1)) + 1) / res.data.appointments).toFixed(1);
            if (avaliacaoAtual > 5)
                avaliacaoAtual = '5.0';

            return avaliacaoAtual;
        }
        return 0;
    }

    return (
        <Container>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getUser} />
            }>

                <CapaIcon source={{ uri: userData.capa }} />
                <Area>
                    <FloatArea>
                        <UserImage>
                            {user.avatar ?
                                <AvatarIcon source={{ uri: user.avatar }} /> :
                                null
                            }
                        </UserImage>
                        {userData.name ?
                            <UserName>{userData.name}</UserName>
                            : null
                        }
                        {userData.email ?
                            <UserEmail>{userData.email}</UserEmail>
                            : null
                        }
                        <UserAppointments>{userData.appointments}</UserAppointments>
                        <UserAppointmentsText>Atendimentos</UserAppointmentsText>
                        <UserAvalicao>{userData.avaliacao}</UserAvalicao>
                        <UserAvalicaoText>Avaliações</UserAvalicaoText>
                    </FloatArea>
                    <ExitButton onPress={handleLogoutClick}>
                        <ExitButtonText>Sair</ExitButtonText>
                    </ExitButton>
                </Area>
            </Scroller>
        </Container>
    );
}