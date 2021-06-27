import React, { useState } from 'react';
import {
    Container,
    SearchArea,
    SearchInput,
    Scroller,
    LoadingIcon,
    ListArea,
    HeaderArea,
    EmptyWarning
} from './styles';

import BarberItem from '../../components/BarberItem';
import Api from '../../Api';
import PageTitle from '../../components/TitleItem';

export default () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [emptyList, setEmptyList] = useState(false);

    const searchBarbers = async () => {
        setEmptyList(false);
        setLoading(true);
        setList([]);

        if (searchText != '') {
            const res = await Api.search(searchText);
            if (!res.error) {
                if (res.list.length > 0) {
                    setList(res.list);
                } else {
                    setEmptyList(true);
                }

            } else {
                alert("Error " + res.error);
            }
        }

        setLoading(false);

    }

    return (
        <Container>
            <HeaderArea>
                <PageTitle page={'Pesquisar'} />
            </HeaderArea>

            <SearchArea>
                <SearchInput
                    placeholder="Digite o nome do barbeiro"
                    placeholderTextColor="#FFFFFF"
                    value={searchText}
                    onChangeText={t => setSearchText(t)}
                    onEndEditing={searchBarbers}
                    returnKeyType="search"
                    autoFocus
                    selectTextOnFocus
                ></SearchInput>
            </SearchArea>

            <Scroller>
                {loading &&
                    <LoadingIcon
                        size="large"
                        color="#000000"
                    >
                    </LoadingIcon>
                }

                {emptyList &&
                    <EmptyWarning>Nenhum resultado encontrado</EmptyWarning>
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