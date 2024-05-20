//message holds message string and ai hold whether or not the message was ai generated
class Message {
    message: String;
    ai: boolean;

    constructor(message: String, ai: boolean) {
        this.message = message;
        this.ai = ai;
    }
}