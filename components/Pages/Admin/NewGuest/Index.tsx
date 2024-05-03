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
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  setOpenNewGuest: React.Dispatch<SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<SetStateAction<string>>;
  openNewGuest: boolean;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter no mínimo 3 caracteres.",
  }),
  isAdmin: z.boolean().optional(),
  receivedInvitation: z.boolean().optional(),
  status: z.boolean().optional(),
});

export default function NewGuest({
  setOpenNewGuest,
  openNewGuest,
  setRefreshList,
}: IProps) {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isAdmin: false,
      receivedInvitation: false,
      status: false,
    },
  });

  async function onSubmit(guest: z.infer<typeof formSchema>) {
    setSuccessMessage("");
    try {
      const response = await guestsService.createGuest(guest);
      if (response.acknowledged) {
        setSuccessMessage(
          `${guest.name.toUpperCase()} foi adicionado na lista de convidados.`,
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
      open={openNewGuest}
      onOpenChange={() => {
        setOpenNewGuest(false);
        setRefreshList(new Date().toString());
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo convidado</DialogTitle>
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

            <div className="flex justify-evenly max-sm:flex-col max-sm:items-center">
              <FormField
                control={form.control}
                name="receivedInvitation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-2">Recebeu Convite?</FormLabel>
                    <FormControl>
                      <Checkbox
                        defaultChecked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-2">Status</FormLabel>
                    <FormControl>
                      <Checkbox
                        defaultChecked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-2">É Administrador?</FormLabel>
                    <FormControl>
                      <Checkbox
                        defaultChecked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
