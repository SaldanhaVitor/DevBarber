import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'https://api.b7web.com.br/devbarber/api';
const BASE_HER_API = 'https://devbarber-example.herokuapp.com';

export default ({
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        }
        );
        const json = await req.json();
        return json;
    },
    SignIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
        );
        const json = await req.json();
        return json;
    },
    SignUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }
        );
        const json = await req.json();
        return json;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const json = await req.json();
        return json;
    },
    getBarbers: async (lat = null, lng = null, address = null) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();

        // json.data.push(
        //     {
        //         id: 4,
        //         name: "Kevin Adams",
        //         avatar: 'https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu',
        //         stars: 5,
        //         latitude: "-23.5730907",
        //         longitude: "-46.6682795",
        //         distance: 0.691000000000108
        //     },
        //     {
        //         id: 1,
        //         name: "Manoela Machado",
        //         avatar: 'https://www.rbsdirect.com.br/imagesrc/24845303.jpg?w=700',
        //         stars: 4.9,
        //         latitude: "-23.5730907",
        //         longitude: "-46.6682795",
        //         distance: 0.691000000000108
        //     }
        // );

        // json.data
        //     .sort((a, b) => a.stars < b.stars ? 1 : -1)
        //     .map(b => {
        //         if (b.name === 'Leticia Diniz') {
        //             b.name = 'Leticia Fernanda'
        //             b.avatar = 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg'
        //         }
        //         if (b.name === 'Amanda Sousa') {
        //             b.name = 'Amanda Salistre'
        //             b.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU'
        //         }
        //         if (b.name === 'Ronaldo Gomes') {
        //             b.name = 'Felipe Gomes'
        //         }
        //     })
        return json;
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        const reqAvailability = await fetch(`${BASE_HER_API}/availability/${id}`);
        const reqAvailabilityJson = await reqAvailability.json();
        json.data.available = reqAvailabilityJson.available;
        return json;
    },
    setFavorite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite?token=${token}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ barber: barberId })
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (barber, service, year, month, day, hour) => {
        const request = {
            barber,
            service,
            year,
            month,
            day,
            hour
        }
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_HER_API}/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(request)
        })
        const json = await req.json();
        return json;
    },
    search: async (barberName) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?q=${barberName}&token=${token}`);
        const json = await req.json();

        // switch (barberName) {
        //     case 'Leticia':
        //         json.list.push({
        //             id: 17,
        //             name: 'Leticia Fernanda',
        //             avatar: 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg',
        //             stars: 3.3,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         })
        //         break;
        //     case 'Manoela':
        //         json.list.push({
        //             id: 1,
        //             name: "Manoela Machado",
        //             avatar: 'https://www.rbsdirect.com.br/imagesrc/24845303.jpg?w=700',
        //             stars: 4.9,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         });
        //         break;
        //     case 'Amanda':
        //         json.list.push({
        //             name: 'Amanda Salistre',
        //             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU',
        //             stars: 4.7,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         })
        //         break;
        //     case 'Kevin':
        //         json.list.push({
        //             id: 4,
        //             name: "Kevin Adams",
        //             avatar: 'https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu',
        //             stars: 5,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         });
        //         break;
        //     default:
        //         break;
        // }

        return json;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorites?token=${token}`);
        const json = await req.json();

        // switch (barberName) {
        //     case 'Leticia':
        //         json.list.push({
        //             id: 17,
        //             name: 'Leticia Fernanda',
        //             avatar: 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg',
        //             stars: 3.3,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         })
        //         break;
        //     case 'Manoela':
        //         json.list.push({
        //             id: 1,
        //             name: "Manoela Machado",
        //             avatar: 'https://www.rbsdirect.com.br/imagesrc/24845303.jpg?w=700',
        //             stars: 4.9,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         });
        //         break;
        //     case 'Amanda':
        //         json.list.push({
        //             name: 'Amanda Salistre',
        //             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU',
        //             stars: 4.7,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         })
        //         break;
        //     case 'Kevin':
        //         json.list.push({
        //             id: 4,
        //             name: "Kevin Adams",
        //             avatar: 'https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu',
        //             stars: 5,
        //             latitude: "-23.5730907",
        //             longitude: "-46.6682795",
        //             distance: 0.691000000000108
        //         });
        //         break;
        //     default:
        //         break;
        // }
        return json;
    },
    getAppointments: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_HER_API}/appointments`, {
            headers: { token }
        });
        const json = await req.json();
        return json;
    },
    deleteAppointment: async (id, boolean) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_HER_API}/appointment/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token
            }
        });
        const json = await req.json();
        return json;
    },
    updateUser: async (body) => {
        const token = await AsyncStorage.getItem('token');
        body.token = token;

        const req = await fetch(`${BASE_API}/user`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await req.json();
        return json;
    },
});