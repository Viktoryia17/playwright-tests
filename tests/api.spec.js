// tests/api.spec.js

import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {

    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingid;
    let token;

    const booking = {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };

    test('Создание бронирования (Create - POST)', async ({ request }) => {
        // Отправляем POST-запрос
        const response = await request.post(`${baseURL}/booking`, {
            data: booking
        });

        // Проверка 1: Статус-код ответа
        // console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        // Проверка 2: Тело ответа не пустое
        const responseBody = await response.json();
        // console.log('Тело ответа:', responseBody);

        expect(responseBody.bookingid).toBeTruthy();

        bookingid = responseBody.bookingid;

        // В ответе возвращаются те же данные, которые вы отправляли в запросе
        expect(responseBody.booking).toEqual(booking);
    });

    test('Получение бронирований ID', async ({ request }) => {
        // Отправляем GET-запрос
        const response = await request.get(`${baseURL}/booking/${bookingid}`);

        // Проверка 1: Статус-код ответа
        expect(response.status()).toBe(200);

        // Проверка 2: Тело ответа не пустое
        const responseBody = await response.json();
        
        expect(responseBody).toEqual(booking);
    });

    test('Обновление бронирования', async ({ request }) => {
        // Отправляем POST-запрос
        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });

        const auth = await authResponse.json();
        token = auth.token;

        booking.firstname = 'Vasia';
        booking.lastname = 'Pupkin';

        const updateResponse = await request.put(`${baseURL}/booking/${bookingid}`, {
            data: booking,
            headers: {
                Cookie: `token=${token}`
            }
        });

        const body = await updateResponse.json();

        // Проверка 1: Статус-код ответа
        expect(updateResponse.status()).toBe(200);
        
        // В ответе возвращаются те же данные, которые вы отправляли в запросе
        expect(body).toEqual(booking);
    });

    test('Удаление бронирования', async ({ request }) => {
        const updateResponse = await request.delete(`${baseURL}/booking/${bookingid}`, {
            headers: {
                Cookie: `token=${token}`
            }
        });

        // Проверка 1: Статус-код ответа
        expect(updateResponse.status()).toBe(201);

        // Отправляем GET-запрос
        const response = await request.get(`${baseURL}/booking/${bookingid}`);

        // Проверка 2: Статус-код ответа
        expect(response.status()).toBe(404);
    });
});
