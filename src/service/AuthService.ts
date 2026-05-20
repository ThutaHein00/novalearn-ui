import type {RegisterDto} from "../model/RegisterDto.ts";
import  axios from "axios";
import type {LoginDto} from "../model/LoginDto.ts";
import type {LoginResponse} from "../model/LoginResponse.ts";


const  NOVA_LEARN_URI = "http://localhost:8080/api/auth";

export const login = (loginDto:LoginDto) =>
    axios.post<LoginResponse>(NOVA_LEARN_URI + "/login", loginDto);

export const register = (registerDto:RegisterDto) =>
    axios.post<RegisterDto>(NOVA_LEARN_URI + "/register", registerDto);

export const setToken = (token:string) =>
    localStorage.setItem("token", token);
export const getToken = () =>
    localStorage.getItem("token");

export const isLoggedLin = () =>
    localStorage.getItem("token") !== null;

export const setRoleName = (roleName:string)=>
    sessionStorage.setItem("roleName", roleName);
export const getRoleName = () =>
    sessionStorage.getItem("roleName");

export const isTeacher = () =>
    getRoleName() === "ROLE_TEACHER";

export const isStudent = () =>
    getRoleName() === "ROLE_STUDENT";



export const setLoggedInUserName = (username:string) =>
    sessionStorage.setItem("username", username);
export const getLoggedInUserName = () =>
    sessionStorage.getItem("username");

