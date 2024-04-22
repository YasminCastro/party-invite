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
  partyName: "Quintal do Gê",
  seoName: "Quintal do Gê",
  data: "22/06/2024 às 11h30",
  lastDateToConfirm: "19/12",
  spotifyUrl: null,
  whatsappNumber: "5562984016328",
  addressWritten: "Live Tower Lozandes - Park Lozandes",
  address:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4544.630192546737!2d-49.224643498822296!3d-16.69872562096442!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b64b07dd33%3A0x89d093940492476a!2sLive%20Tower%20Lozandes!5e0!3m2!1spt-BR!2sbr!4v1713828697446!5m2!1spt-BR!2sbr",
  buttonColor: "light",
  chavePix: "",
};

export default projectConfig;
