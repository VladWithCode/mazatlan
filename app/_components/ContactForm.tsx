"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import z from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { sendWhatsAppContactRequest } from "../api/contact/actions";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
        },
    });

    const onSubmit = useCallback(async (data: FormValues) => {
        setIsSubmitting(true);
        const { error } = await sendWhatsAppContactRequest(data)
        if (error) {
            setIsSubmitting(false);
            toast.error(error.message || "Ocurrió un error al enviar la solicitud de cita");
            return;
        }

        toast.success("Se ha enviado la solicitud de cita");
        setIsSubmitting(false);
        setIsOpen(false);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="uppercase font-bold tracking-wide bg-green-700 px-12 mx-8" variant="ghost">Solicitar Cita</Button>
            </DialogTrigger>
            <DialogContent>
                <form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/20 text-white rounded backdrop-blur-[2px] opacity-0 pointer-events-none data-[state=submitting]:opacity-100 data-[state=submitting]:pointer-events-auto"
                        data-state={isSubmitting ? "submitting" : "idle"}
                    >
                        <Spinner className="size-16" />
                        <p className="text-lg font-bold tracking-wider">Enviando ...</p>
                    </div>

                    <DialogHeader>
                        <DialogTitle>Solicitar escrituras</DialogTitle>
                        <DialogDescription>
                            Ingresa tus datos y nos pondremos en contacto para agendar tu cita.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Nombre</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Nombre"
                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Número de teléfono</FieldLabel>
                                    <Input
                                        {...field}
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Número de teléfono"
                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Enviar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "El nombre no puede ser menor a 2 caracteres." })
        .max(50, { message: "El nombre no puede superar los 50 caracteres." }),
    phone: z
        .string()
        .min(10, { message: "El número de teléfono no puede ser menor a 10 caracteres." })
        .max(16, { message: "El número de teléfono no puede superar los 16 caracteres." }),
});
