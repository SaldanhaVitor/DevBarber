import React, { useState, useEffect } from 'react';
import {
    Container,
    HeaderArea,
    Scroller,
    ListArea,
    EmptyWarning
} from './styles';

import BarberItem from '../../components/BarberItem';
import Api from '../../Api';
import { RefreshControl } from 'react-native';
import PageTitle from '../../components/TitleItem';


export default () => {

    useEffect(() => {
        getFavorites();

    }, []);

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getFavorites = async () => {
        setLoading(true);
        setList([]);

        const res = await Api.getFavorites();
        if (!res.error) {
            setList(res.list);
        } else {
            alert("Error " + res.error);
        }
        setLoading(false);
    }

    return (
        <Container>
            <HeaderArea>
                <PageTitle page={'Favoritos'} />
            </HeaderArea>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getFavorites} />
            }>

                {!loading && list.length === 0 &&
                    <EmptyWarning>Não há favoritos</EmptyWarning>
                }

                <ListArea>
                    {list.map((item, key) => (
                        <BarberItem key={key} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}