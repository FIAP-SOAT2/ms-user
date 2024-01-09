import { ProfileEnum } from '../../domain/enum/UserEnum';

export type IUserDomain = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  profile: ProfileEnum | string;
  created_at: Date;
  updated_at: Date;
};

export class UserEntity implements IUserDomain {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  profile: ProfileEnum;
  created_at: Date;
  updated_at: Date;

  constructor(props: IUserDomain) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.cpf = props.cpf;
    this.phone = props.phone;
    this.profile = props.profile as ProfileEnum;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: IUserDomain): UserEntity {
    return new UserEntity(props);
  }
}
