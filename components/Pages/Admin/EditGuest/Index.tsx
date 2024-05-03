"use client";

import { SetStateAction } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";

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
  status: z.boolean(),
  receivedInvitation: z.boolean(),
  isAdmin: z.boolean().optional(),
});

export default function EditGuest({
  setOpenEditGuest,
  openEditGuest,
  setRefreshList,
  guest,
}: IProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guest.name,
      status: guest.status,
      receivedInvitation: guest.receivedInvitation,
      isAdmin: guest.isAdmin,
    },
  });

  async function onSubmit({
    name,
    status,
    receivedInvitation,
    isAdmin,
  }: z.infer<typeof formSchema>) {
    try {
      const response = await guestsService.updateGuests({
        _id: guest._id,
        name,
        status,
        receivedInvitation,
        isAdmin,
      });

      if (response._id) {
        setOpenEditGuest(false);
        setRefreshList(new Date().toString());
      } else {
        form.setError("name", {
          type: "custom",
          message: "Erro interno tente novamente mais tarde.",
        });
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

            <div className="flex justify-evenly">
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

              {guest.name !== "aniversariante" && (
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
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
