import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'https://api.b7web.com.br/devbarber/api';

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

        json.data.push(
            {
                id: 4,
                name: "Kevin Adams",
                avatar: 'https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu',
                stars: 5,
                latitude: "-23.5730907",
                longitude: "-46.6682795",
                distance: 0.691000000000108
            },
            {
                id: 1,
                name: "Manoela Machado",
                avatar: 'https://www.rbsdirect.com.br/imagesrc/24845303.jpg?w=700',
                stars: 4.9,
                latitude: "-23.5730907",
                longitude: "-46.6682795",
                distance: 0.691000000000108
            }
        );

        json.data
            .sort((a, b) => a.stars < b.stars ? 1 : -1)
            .map(b => {
                if (b.name === 'Leticia Diniz') {
                    b.name = 'Leticia Fernanda'
                    b.avatar = 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg'
                }
                if (b.name === 'Amanda Sousa') {
                    b.name = 'Amanda Salistre'
                    b.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU'
                }
                if (b.name === 'Ronaldo Gomes') {
                    b.name = 'Felipe Gomes'
                }
            })
        return json;
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        switch (id) {
            case 1:
                json.data = {
                    "id": 1,
                    "name": "Manoela Machado",
                    "avatar": 'https://www.rbsdirect.com.br/imagesrc/24845303.jpg?w=700',
                    "stars": 4.9,
                    "latitude": "-23.5430907",
                    "longitude": "-46.6182795",
                    "favorited": false,
                    "photos": [
                        {
                            "id": 13,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/3.png"
                        },
                        {
                            "id": 14,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        },
                        {
                            "id": 15,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        },
                        {
                            "id": 16,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        }
                    ],
                    "services": [
                        { "id": 15, "name": "Pintura de Pernas", "price": 85.3 },
                        { "id": 16, "name": "Corte de Cabelo", "price": 37.42 },
                        { "id": 17, "name": "Corte de Unha", "price": 33.49 }
                    ],
                    "testimonials": [
                        {
                            "id": 10,
                            "name": "Pedro Diniz",
                            "rate": 2,
                            "body": "Fusce malesuada justo in maximus auctor. In quis enim in."
                        },
                        {
                            "id": 11,
                            "name": "Leticia Alvaro",
                            "rate": 3.7,
                            "body": "Sed pulvinar, neque sed blandit fermentum, dui mi sollicitudin turpis."
                        },
                        {
                            "id": 12,
                            "name": "Gabriel Lacerda",
                            "rate": 2.4,
                            "body": "Maecenas ullamcorper mi a justo egestas ultrices quis eget lacus."
                        }
                    ],
                    "available": [
                        {
                            "date": "2021-05-11",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-12",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-16",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        },
                        {
                            "date": "2021-05-17",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-18",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-19",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-23",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        },
                        {
                            "date": "2021-05-24",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-25",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-26",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-30",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        }
                    ]
                }
                break;
            case 2:
                Object.assign(json.data, { name: 'Amanda Salistre', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU' })
                break;
            case 4:
                json.data = {
                    "id": 4,
                    "name": "Kevin Adams",
                    "avatar": "https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu",
                    "stars": 5,
                    "latitude": "-23.5430907",
                    "longitude": "-46.6182795",
                    "favorited": false,
                    "photos": [
                        {
                            "id": 13,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/3.png"
                        },
                        {
                            "id": 14,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        },
                        {
                            "id": 15,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        },
                        {
                            "id": 16,
                            "url": "https://api.b7web.com.br/devbarber/media/uploads/1.png"
                        }
                    ],
                    "services": [
                        { "id": 15, "name": "Pintura de Pernas", "price": 85.3 },
                        { "id": 16, "name": "Corte de Cabelo", "price": 37.42 },
                        { "id": 17, "name": "Corte de Unha", "price": 33.49 }
                    ],
                    "testimonials": [
                        {
                            "id": 10,
                            "name": "Pedro Diniz",
                            "rate": 2,
                            "body": "Fusce malesuada justo in maximus auctor. In quis enim in."
                        },
                        {
                            "id": 11,
                            "name": "Leticia Alvaro",
                            "rate": 3.7,
                            "body": "Sed pulvinar, neque sed blandit fermentum, dui mi sollicitudin turpis."
                        },
                        {
                            "id": 12,
                            "name": "Gabriel Lacerda",
                            "rate": 2.4,
                            "body": "Maecenas ullamcorper mi a justo egestas ultrices quis eget lacus."
                        }
                    ],
                    "available": [
                        {
                            "date": "2021-05-11",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-12",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-16",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        },
                        {
                            "date": "2021-05-17",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-18",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-19",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-23",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        },
                        {
                            "date": "2021-05-24",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-25",
                            "hours": [
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00"
                            ]
                        },
                        {
                            "date": "2021-05-26",
                            "hours": [
                                "08:00",
                                "09:00",
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00"
                            ]
                        },
                        {
                            "date": "2021-05-30",
                            "hours": [
                                "10:00",
                                "11:00",
                                "12:00",
                                "13:00",
                                "14:00",
                                "15:00",
                                "16:00",
                                "17:00"
                            ]
                        }
                    ]
                }
                break;
            case 8:
                Object.assign(json.data, { name: 'Felipe Gomes' })
                break;
            case 9:
                Object.assign(json.data, { name: 'Leticia Fernanda', avatar: 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg' })
                break;
            default:
                break;
        }
        return json;
    },
    setAppointment: async (userId, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${userId}/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, service, year: selectedYear, month: selectedMonth, day: selectedDay, hour: selectedHour })
        });
        const json = await req.json();
        return json;
    },
    search: async (barberName) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?q=${barberName}&token=${token}`);
        const json = await req.json();

        switch (barberName) {
            case 'Leticia':
                Object.assign(json.list, { name: 'Leticia Fernanda', avatar: 'https://uploads.metropoles.com/wp-content/uploads/2021/02/25154218/LuanaBarbeira2.jpg' })
                break;
            case 'Manoela':
                break;
            case 'Amanda':
                Object.assign(json.list, { name: 'Amanda Salistre', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorFgjFc14z10jFB_R4twh0JL1DSjwGYH-rxJKN-JLhijL4QsCoICc9MpZk8IRC-lrByo&usqp=CAU' })
                break;
            case 'Kevin':
                json.list.push({
                    id: 4,
                    name: "Kevin Adams",
                    avatar: 'https://lh5.googleusercontent.com/proxy/xzBXgM3WrKn68u5OaWKmPoWfKbcMufX1XDdzBwFvoCLOYTMn_PBGF5p40r6DhvGKRHpOMtRcd0xoZF7v_bCBGriCW8zaKmQKr9hmkxYkFI4BHqVeWAV0QdqaKg=w1200-h630-p-k-no-nu',
                    stars: 5,
                    latitude: "-23.5730907",
                    longitude: "-46.6682795",
                    distance: 0.691000000000108
                });
                break;
            case 'Felipe':
                break;
            default:
                break;
        }

        console.log(json)
        return json;
    }
});