<?php
// Copier hors de la racine publique. Installer PHPMailer via Composer dans ce dossier privé.
// Configurer AIMY_CONTACT_CONFIG avec le chemin absolu du vrai fichier. Aucun secret dans Git.
use PHPMailer\PHPMailer\PHPMailer;
require __DIR__.'/vendor/autoload.php';
return [
 'enabled'=>false,
 'origins'=>['https://aimy-digital.fr'],
 'state_dir'=>__DIR__.'/rate-limits',
 'rate_secret'=>getenv('AIMY_RATE_SECRET'),
 'send'=>static function(array $data): bool {
  $mail=new PHPMailer(true);
  $mail->isSMTP();$mail->Host=getenv('AIMY_SMTP_HOST');$mail->SMTPAuth=true;
  $mail->Username=getenv('AIMY_SMTP_USER');$mail->Password=getenv('AIMY_SMTP_PASSWORD');
  $mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;$mail->Port=587;$mail->Timeout=15;
  $mail->CharSet='UTF-8';$mail->setFrom(getenv('AIMY_SMTP_FROM'),'Aimy Digital');
  $mail->addAddress(getenv('AIMY_CONTACT_TO'));$mail->addReplyTo($data['email'],$data['name']);
  $mail->Subject='Demande de projet via le site Aimy Digital';
  $mail->Body="Nom : {$data['name']}\nEntreprise : {$data['company']}\nTéléphone : {$data['phone']}\nBesoin : {$data['need']}\n\n{$data['message']}";
  return $mail->send();
 }
];
