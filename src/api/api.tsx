import React from 'react';
import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'c13fa168-cea5-4630-847d-9c0d00665f01'}
});

export const usersAPI = {
    getUsersData(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data);
    },
    unfollowUsers(id: number) {
        return instance.delete(`follow/${id}`);
    },
    followUsers(id: number) {
        return instance.post(`follow/${id}`);
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
        // return instance.get(`profile/` + userId);
    }
}


export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status});
    }
}
export const authAPI = {
    authMe() {
        return instance.get('auth/me');
    },
    login(email: string, password: string, rememberMe: boolean, captcha: boolean){
        return instance.post('auth/login', {email, password, rememberMe, captcha});
    },
    logout(){
        return  instance.delete('auth/login');
    }
}

