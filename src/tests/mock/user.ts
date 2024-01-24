import { UserEntity } from "../../domain/entities/User";
import { ProfileEnum } from "../../domain/enum/UserEnum";

export const user: UserEntity = {
    id: 1,
    name: "Joao Maria",
    email: "joao.maria@gmail.com",
    phone: "89973391472",
    cpf: "35524867474",
    profile: ProfileEnum.CUSTOMER,
    created_at: undefined,
    updated_at: undefined
}

export const userEmailError: UserEntity = {
    id: 1,
    name: "Joao Maria",
    email: "joao.maria",
    phone: "89973391472",
    cpf: "35524867474",
    profile: ProfileEnum.CUSTOMER,
    created_at: undefined,
    updated_at: undefined
}

export const userCPFError: UserEntity = {
    id: 1,
    name: "Joao Maria",
    email: "joao.maria@gmail.com",
    phone: "89973391472",
    cpf: "000000000",
    profile: ProfileEnum.CUSTOMER,
    created_at: undefined,
    updated_at: undefined
}