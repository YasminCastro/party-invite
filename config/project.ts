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
  partyName: "Genesi de repente 30",
  seoName: "De repente 30",
  data: "21/06/2025 as 19h",
  lastDateToConfirm: "12/11",
  whatsappNumber: "5562982043566",
  addressWritten: "Yolo Beer Garden - Setor Sul",
  address:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.740652342405!2d-49.25461632485061!3d-16.68985658408326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b3cc06e5e3%3A0xc6c311cd8f1c8de2!2sYolo%20Beer%20Garden!5e0!3m2!1spt-BR!2sbr!4v1748304109940!5m2!1spt-BR!2sbr",
  chavePix: "",
  spotifyUrl: null,
};

export default projectConfig;
