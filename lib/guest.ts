import axios from "axios";

interface IUptadeGuest {
  id: string;
  name: string;
  receivedInvitation: boolean;
}

export const updateGuest = async ({
  name,
  id,
  receivedInvitation,
}: IUptadeGuest) => {
  try {
    const { data } = await axios.put("/api/guests/update", {
      name: name.trim().toLocaleLowerCase(),
      receivedInvitation,
      id,
    });

    if (data.message) {
      throw new Error("Erro interno, tente novamente mais tarde.");
    }

    return { message: "Convidado atualizado com sucesso." };
  } catch (error: any) {
    return { error: "Erro interno tente novamente mais tarde." };
  }
};
