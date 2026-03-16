export function LocationMap({ ...props }: {
} & React.HTMLAttributes<HTMLIFrameElement>) {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2198.97469889713!2d-106.33240620834059!3d23.184053761761373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2smx!4v1772742057151!5m2!1ses-419!2smx"
            style={{ border: 0 }}
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            {...props}
        />
    );
}
