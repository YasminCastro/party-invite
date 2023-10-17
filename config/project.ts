interface IProject {
  partyName: string;
  seoName: string;
  data: string;
  lastDateToConfirm: string;

  spotifyUrl: string | null;
  whatsappNumber: string;
  address: string;
  chavePix: string;

  buttonColor: "dark" | "light";
}

const projectConfig: IProject = {
  partyName: "Party Invite",
  seoName: "Invite",
  data: "16/12/2023 às 16h",
  lastDateToConfirm: "13/12",
  spotifyUrl:
    "https://open.spotify.com/playlist/0Fyoivhuile8c1RSOEGdYd?si=91fa4819a3ee4eb6",
  whatsappNumber: "5562981695581",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.825514907909!2d-49.241651922436304!3d-16.735555705669753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef064c309f58f%3A0xa4e43a686b274059!2sR.%2037%2C%20623-401%20-%20Jardim%20Bela%20Vista%2C%20Aparecida%20de%20Goi%C3%A2nia%20-%20GO%2C%2074912-090!5e0!3m2!1spt-BR!2sbr!4v1695839230162!5m2!1spt-BR!2sbr",
  buttonColor: "dark",
  chavePix: "70155025180",
};

export default projectConfig;
