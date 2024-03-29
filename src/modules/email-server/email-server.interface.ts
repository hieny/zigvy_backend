

export interface MailService {
    sendMail(content: Object): Promise<void>;

    sendMailSandbox(content: Object): Promise<void>
}