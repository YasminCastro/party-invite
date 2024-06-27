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
}

const projectConfig: IProject = {
  partyName: "24 da Yas",
  seoName: "24 da Yas",
  data: "19/07/2024 ás 20h",
  lastDateToConfirm: "15/07",
  whatsappNumber: "5562981695581",
  addressWritten: "Quintal da árvore - Jardim Planalto",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23573.820360106623!2d-49.30941839019124!3d-16.705237530056333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef74366cd9a6d%3A0xb6b822483395a821!2sQuintal%20da%20%C3%81rvore!5e0!3m2!1spt-BR!2sbr!4v1717524798696!5m2!1spt-BR!2sbr",
  chavePix: "373d7e9c-5cb4-427e-99a0-1a7898d59f9b",
  spotifyUrl:
    "https://open.spotify.com/playlist/7rppPNJzZPFPCaRzojzoAu?si=f81d108233ea49b8&pt=50a29d514f2e3a82f1db1aca19940e72",
};

export default projectConfig;
