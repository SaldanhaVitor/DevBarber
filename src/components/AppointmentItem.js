import React from 'react';
import styled from 'styled-components/native';
import Api from '../Api';
import { Alert } from "react-native";

const Area = styled.View`
    background-color: #FFFFFF;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 20px;
`;
const UserArea = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;
const Avatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 20px;
`;
const UserName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000000;
`;
const SplitArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;
const ServiceText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;
const DateText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #4EADBE;
`;
const CancelButton = styled.TouchableOpacity`
    background-color: #4EADBE;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-left: 20px;
`;

const CancelButtonText = styled.Text`
    color: #FFFFFF;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
`;

export default ({ data }) => {
    // Tempo
    const time = `${data.hour}:00`;

    let { day, year, month } = data;
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    const dateString = `${day}/${month}/${year}`;

    const handleCancelaAtendimento = async () => {
        Alert.alert(
            "Cancelar Atendimento",
            "Você deseja cancelar este atendimento?",
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        const id = data.appointment_id;
                        const res = await Api.deleteAppointment(id, true);

                        if (!res.error) {
                            Alert.alert(
                                "Cancelar Atendimento",
                                "Atendimento cancelado com sucesso"
                            );
                        }
                    }
                },
            ]
        );
    }


    return (
        <Area
            style={{
                opacity: data.old ? 0.5 : 1
            }}>
            <UserArea>
                <Avatar source={{ uri: data.barber.avatar }} />
                <UserName>{data.barber.name}</UserName>
                <CancelButton onPress={data.old ? null : handleCancelaAtendimento}>
                    <CancelButtonText>Cancel. Atend.</CancelButtonText>
                </CancelButton>
            </UserArea>

            <SplitArea>
                <ServiceText>{data.service.name}</ServiceText>
                <ServiceText>R$ {data.service.price.toFixed(2)}</ServiceText>
            </SplitArea>

            <SplitArea>
                <DateText>{dateString}</DateText>
                <DateText>{time}</DateText>
            </SplitArea>
        </Area>
    );
}