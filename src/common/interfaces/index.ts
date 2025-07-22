export interface IIConProps {
  fill?: string;
  width?: string | number;
  height?: string | number;
}
export interface IUserData {
  usrFirstName: string;
  usrLastName: string;
  usrEmail: string;
  usrMobile: string;
  usrId: string;
  uuid: string;
  hasAnygstinRegistered: string;
  multiUserType: string;
  createdDate: string;
}

export interface ILoginApiProps {
  email: string;
  password: string;
}
