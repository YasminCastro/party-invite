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
  partyName: "QUINTAL DO GÊ",
  seoName: "QUINTAL DO GÊ",
  data: "22/06/2024 às 11h30",
  lastDateToConfirm: "15/06",
  whatsappNumber: "5562984016328",
  addressWritten: "Quintal da árvore - Jardim Planalto",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23573.820360106623!2d-49.30941839019124!3d-16.705237530056333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef74366cd9a6d%3A0xb6b822483395a821!2sQuintal%20da%20%C3%81rvore!5e0!3m2!1spt-BR!2sbr!4v1717524798696!5m2!1spt-BR!2sbr",
  buttonColor: "light",
  chavePix: "62984016328",
  spotifyUrl:
    "https://open.spotify.com/playlist/6g5OG3nqNOJ01scXI1Ompc?si=XJzTAU7TR7K0WMQoAVLYMQ&pi=u-V51Et8MNTsGA",
};

export default projectConfig;
