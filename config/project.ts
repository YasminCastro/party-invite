interface IProject {
  partyName: string;
  seoName: string;
  data: string;
  lastDateToConfirm: string;

  spotifyUrl: string | null;
  whatsappNumber: string;
  address: string;
  addressWritten: string;
  chavePix: string;

  buttonColor: "dark" | "light";
}

const projectConfig: IProject = {
  partyName: "Glaucia Eletrohits 30",
  seoName: "Glaucia Eletrohits",
  data: "16/12/2023 às 19h",
  lastDateToConfirm: "13/12",
  spotifyUrl: null,
  whatsappNumber: "5562983321120",
  addressWritten: "Rua 37, QD 17, LT 07 - Jardim Bela Vista",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.825514907909!2d-49.241651922436304!3d-16.735555705669753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef064c309f58f%3A0xa4e43a686b274059!2sR.%2037%2C%20623-401%20-%20Jardim%20Bela%20Vista%2C%20Aparecida%20de%20Goi%C3%A2nia%20-%20GO%2C%2074912-090!5e0!3m2!1spt-BR!2sbr!4v1695839230162!5m2!1spt-BR!2sbr",
  buttonColor: "light",
  chavePix: "3abb357e-b1bb-43f1-98d7-a05be29f4bf8",
};

export default projectConfig;
