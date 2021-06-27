import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
    Container,
    Scroller,
    ListArea,
    EmptyWarning
} from './styles';

import AppointmentItem from '../../components/AppointmentItem';
import Api from '../../Api';
import PageTitle from '../../components/TitleItem';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getAppointments();
        if (!res.error) {
            setList(res);
        }
        setLoading(false);
    }

    return (
        <Container>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getAppointments} />
            }>
                <PageTitle page={'Agendamentos'} />

                {!loading && list.length === 0 &&
                    <EmptyWarning>Não há agendamentos.</EmptyWarning>
                }

                <ListArea>
                    {list.map((item, k) => (
                        <AppointmentItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>

        </Container>
    );
}