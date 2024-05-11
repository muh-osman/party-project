<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    protected string $qrCodeUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(string $qrCodeUrl)
    {
        $this->qrCodeUrl = $qrCodeUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'QR Code Email',
            // this will overwrite on "MAIL_FROM_ADDRESS" and "MAIL_FROM_NAME" in .env file
            // from: new Address('youremail@mail.com', 'my company'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emailTemplate',
            with: ['qrCodeUrl' => $this->qrCodeUrl],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Path to the image file on your server
        return [];
    }
}
