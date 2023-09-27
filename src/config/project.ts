interface IProject {
  partyName: string;
  seoName: string;
  data: string;
  lastDateToConfirm: string;

  spotifyUrl: string | null;
  whatsappNumber: string;
  address: string;
}

const projectConfig: IProject = {
  partyName: "Glaucia Eletrohits 30",
  seoName: "Glaucia Eletrohits 30",
  data: "16/12/2023 às 12h",
  lastDateToConfirm: "13/12",
  // spotifyUrl:
  //   "https://open.spotify.com/playlist/0Fyoivhuile8c1RSOEGdYd?si=91fa4819a3ee4eb6",
  spotifyUrl: null,
  whatsappNumber: "5562983321120",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5681504789345!2d-49.22603822518672!3d-16.698480084075918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b64b07dd33%3A0x89d093940492476a!2sLive%20Tower%20Lozandes!5e0!3m2!1spt-BR!2sbr!4v1687348514021!5m2!1spt-BR!2sbr",
};

export default projectConfig;
