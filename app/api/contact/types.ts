import z from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, { message: "El nombre no puede ser menor a 2 caracteres." }),
    phone: z.string().min(10, { message: "El número de teléfono no puede ser menor a 10 caracteres." }),
});

export type TContactFormData = z.infer<typeof contactSchema>;

export interface WhatsAppMessageRequest {
    toPhoneNumber: string;
    type: 'template' | 'text';
    message?: string;
    templateData?: {
        name: string;
        bodyVariables?: GenericObject[];
        headerVariables?: GenericObject[];
        language?: {
            code: string;
        };
    };
}

export interface WhatsAppContactRequest {
    name: string;
    phone: string;
}

export interface WhatsAppResponse {
    messaging_product: 'whatsapp';
    contacts?: Array<{
        input: string;
        wa_id: string;
    }>;
    messages?: Array<{
        id: string;
    }>;
}

export interface TemplateVariable {
    type: 'text';
    text: string;
}

export interface ContactFormResponse {
    success: boolean;
    data?: {
        notificationResponse?: WhatsAppResponse;
        sendDataResponse?: WhatsAppResponse;
    };
    error?: string;
}

export type GenericObject = { [key: string]: any };
