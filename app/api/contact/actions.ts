'use server';

import { contactSchema, TContactFormData, TemplateVariable, WhatsAppResponse } from './types';
import { dateToLongDate, logContactRequest, postCloudAPIMessage } from './whatsapp-service';

const contactPhone = process.env.WHATSAPP_NOTIFICATIONS_PHONE;

export type TContactRequestResult = {
    result: WhatsAppResponse;
    error: null;
} | {
    result: null;
    error: Error;
};

export async function sendWhatsAppContactRequest(data: TContactFormData): Promise<TContactRequestResult> {
    if (!contactPhone) {
        throw new Error('No se configuró el número de teléfono de las notificaciones');
    }

    const parsedResult = contactSchema.safeParse(data)

    if (!parsedResult.success) {
        return {
            error: Error("Datos inválidos: " + parsedResult.error.message),
            result: null,
        };
    }

    const vDate: TemplateVariable = {
        type: 'text',
        text: dateToLongDate(new Date()),
    };
    const vName: TemplateVariable = {
        type: 'text',
        text: parsedResult.data.name,
    };
    const vPhone: TemplateVariable = {
        type: 'text',
        text: parsedResult.data.phone,
    };

    const templateData = {
        name: "mzt_contact_req",
        bodyVariables: [vName, vPhone, vDate],
    };

    try {
        const result = await postCloudAPIMessage({
            toPhoneNumber: contactPhone,
            type: 'template',
            templateData,
        });

        logContactRequest({
            customerPhone: data.phone,
            customerName: data.name,
            date: new Date(),
        });

        return {
            error: null,
            result: result,
        };
    } catch (err) {
        console.error('Error al enviar solicitud de contacto:', err);
        return {
            error: Error("Ocurrió un error al enviar el mensaje. Intenta nuevamente más tarde."),
            result: null,
        };
    }
}
