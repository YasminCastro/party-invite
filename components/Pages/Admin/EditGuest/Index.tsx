import { SetStateAction, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as guestsService from "@/services/guests";
import { IGuest } from "@/interface/guests";

interface IProps {
  setOpenEditGuest: React.Dispatch<SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<SetStateAction<string>>;
  openEditGuest: boolean;
  guest: IGuest;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter no mínimo 3 caracteres.",
  }),
});

export default function EditGuest({
  setOpenEditGuest,
  openEditGuest,
  setRefreshList,
  guest,
}: IProps) {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guest.name,
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    setSuccessMessage("");
    try {
      const response = await guestsService.createGuest(name);
      if (response.acknowledged) {
        setSuccessMessage(
          `${name.toUpperCase()} foi adicionado na lista de convidados.`,
        );
        form.setValue("name", "");
      } else {
        if (response.message === "Guest alredy exists") {
          form.setError("name", {
            type: "custom",
            message: "Convidado já registrado.",
          });
        } else {
          form.setError("name", {
            type: "custom",
            message: "Erro interno tente novamente mais tarde.",
          });
        }
      }
    } catch (error) {
      form.setError("name", {
        type: "custom",
        message: "Erro interno tente novamente mais tarde.",
      });
    }
  }

  return (
    <Dialog
      open={openEditGuest}
      onOpenChange={() => {
        setOpenEditGuest(false);
        setRefreshList(new Date().toString());
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar convidado</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-3">
              {successMessage && (
                <span className=" text-base leading-relaxed text-green-500">
                  {successMessage}
                </span>
              )}
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
